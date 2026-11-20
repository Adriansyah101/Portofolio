import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { ROOM_LAYOUT } from "./DeveloperRoom.jsx";
import { Tablet } from "../Models/DeskParts.jsx";
import { createContactScreenTexture } from "../Models/canvasTextures.js";

/** Pointer travel (px) above which a press counts as an orbit drag, not a click. */
const DRAG_TOLERANCE = 6;

/** Tooltip key in `ui.hero` for each route a screen opens. */
const TOOLTIPS = {
  journey: "openJourney",
  projects: "openProjects",
  notes: "openNotes",
  contact: "openContact",
};

/**
 * Pointer handlers shared by every clickable object: a pointer cursor and the
 * hovered state, a bilingual tooltip that follows the pointer
 * (`onTip(label, x, y)`, `onTip(null)` hides it) and a click that ignores
 * orbit drags.
 */
const useHotspot = ({ tooltip, onTip, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const gl = useThree((state) => state.gl);

  // React runs every cleanup before the new effects, so moving straight from
  // one object to another ends on "pointer" whatever their order in the tree.
  useEffect(() => {
    if (!hovered) return undefined;
    gl.domElement.style.cursor = "pointer";
    return () => (gl.domElement.style.cursor = "");
  }, [gl, hovered]);

  const handlers = {
    onPointerOver: (event) => {
      event.stopPropagation();
      setHovered(true);
      onTip(tooltip, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    },
    onPointerMove: (event) => onTip(tooltip, event.nativeEvent.offsetX, event.nativeEvent.offsetY),
    onPointerOut: () => {
      setHovered(false);
      onTip(null);
    },
    onClick: (event) => {
      event.stopPropagation();
      if (event.delta > DRAG_TOLERANCE) return;
      onTip(null);
      onSelect();
    },
  };
  return [hovered, handlers];
};

/** Invisible click target laid over a screen; hovering adds a faint sheen on the glass. */
const ScreenHotspot = ({ width, height, depth = 0.08, tooltip, onTip, onSelect, ...props }) => {
  const [hovered, handlers] = useHotspot({ tooltip, onTip, onSelect });

  return (
    <group {...props}>
      <mesh {...handlers}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={hovered ? 0.07 : 0} depthWrite={false} />
      </mesh>
    </group>
  );
};

/** The desk tablet: lifts slightly, brightens and lights its edge while hovered. */
const ContactTablet = ({ tooltip, onTip, onSelect, ...props }) => {
  const [hovered, handlers] = useHotspot({ tooltip, onTip, onSelect });
  const texture = useMemo(() => createContactScreenTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const lift = useRef(null);
  const screen = useRef(null);
  const rim = useRef(null);
  const glow = useRef(0);

  useFrame((_, delta) => {
    glow.current = MathUtils.damp(glow.current, hovered ? 1 : 0, 9, Math.min(delta, 0.1));
    const g = glow.current;
    if (lift.current) lift.current.position.y = 0.045 * g;
    // #d4d4d8 → #f4f4f5: brighter, still under the bloom threshold.
    if (screen.current) screen.current.color.setScalar(MathUtils.lerp(0.83, 0.95, g));
    if (rim.current) rim.current.opacity = 0.9 * g;
  });

  return (
    <group {...props}>
      <group ref={lift}>
        <Tablet screenTexture={texture} screenMaterialRef={screen} rimRef={rim} />
      </group>
      {/* Generous invisible hit box around the stand and screen. */}
      <mesh position={[0, 0.2, -0.02]} rotation={[-0.42, 0, 0]} {...handlers}>
        <boxGeometry args={[0.72, 0.5, 0.16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

/**
 * Clickable objects in the hero room, one per main page: the wall dashboard
 * opens `/journey`, the left desk monitor `/projects`, the right one `/notes`
 * and the desk tablet `/contact`. Positions come from `ROOM_LAYOUT`, so the
 * screen hotspots also work if the procedural room is swapped for a `.glb`
 * with the same layout. `onNavigate(route)` receives a key of `routes`.
 */
const WorkstationHotspots = ({ text, onNavigate, onTip }) => {
  const { monitors, dashboard, tablet } = ROOM_LAYOUT;

  return (
    <group>
      {monitors.map((monitor) => (
        <group key={monitor.id} position={monitor.position} rotation={monitor.rotation}>
          {/* Screen centre: stand height + half the panel, just in front of the glass. */}
          <ScreenHotspot
            position={[0, 0.55 + monitor.height / 2 + 0.01, -0.02]}
            width={monitor.width}
            height={monitor.height}
            tooltip={text[TOOLTIPS[monitor.route]]}
            onTip={onTip}
            onSelect={() => onNavigate(monitor.route)}
          />
        </group>
      ))}
      <ScreenHotspot
        position={[dashboard.position[0], dashboard.position[1], dashboard.position[2] + 0.03]}
        width={dashboard.width}
        height={dashboard.height}
        tooltip={text[TOOLTIPS[dashboard.route]]}
        onTip={onTip}
        onSelect={() => onNavigate(dashboard.route)}
      />
      <ContactTablet
        position={tablet.position}
        rotation={tablet.rotation}
        tooltip={text[TOOLTIPS[tablet.route]]}
        onTip={onTip}
        onSelect={() => onNavigate(tablet.route)}
      />
    </group>
  );
};

export default WorkstationHotspots;
