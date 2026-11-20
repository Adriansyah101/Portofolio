import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { ROOM_LAYOUT } from "./DeveloperRoom.jsx";

/** Pointer travel (px) above which a press counts as an orbit drag, not a click. */
const DRAG_TOLERANCE = 6;

/**
 * Invisible click target laid over a screen. Hovering shows a pointer cursor,
 * a faint sheen on the glass and a small bilingual tooltip that follows the
 * pointer (`onTip(label, x, y)`, `onTip(null)` hides it); clicking calls
 * `onSelect` (a route change).
 */
const Hotspot = ({ width, height, depth = 0.08, tooltip, onTip, onSelect, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? "pointer" : "";
  }, [gl, hovered]);
  useEffect(() => () => (gl.domElement.style.cursor = ""), [gl]);

  return (
    <group {...props}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          onTip(tooltip, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        }}
        onPointerMove={(event) => onTip(tooltip, event.nativeEvent.offsetX, event.nativeEvent.offsetY)}
        onPointerOut={() => {
          setHovered(false);
          onTip(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (event.delta > DRAG_TOLERANCE) return;
          onSelect();
        }}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={hovered ? 0.07 : 0} depthWrite={false} />
      </mesh>
    </group>
  );
};

/**
 * Clickable screens in the hero room: both desk monitors open `/projects`,
 * the wall status dashboard opens `/journey`. Positions come from
 * `ROOM_LAYOUT`, so the hotspots also work if the procedural room is swapped
 * for a `.glb` with the same layout.
 */
const WorkstationHotspots = ({ text, onNavigate, onTip }) => {
  const { monitors, dashboard } = ROOM_LAYOUT;

  return (
    <group>
      {monitors.map((monitor) => (
        <group key={monitor.id} position={monitor.position} rotation={monitor.rotation}>
          {/* Screen centre: stand height + half the panel, just in front of the glass. */}
          <Hotspot
            position={[0, 0.55 + monitor.height / 2 + 0.01, -0.02]}
            width={monitor.width}
            height={monitor.height}
            tooltip={text.openProjects}
            onTip={onTip}
            onSelect={() => onNavigate("projects")}
          />
        </group>
      ))}
      <Hotspot
        position={[dashboard.position[0], dashboard.position[1], dashboard.position[2] + 0.03]}
        width={dashboard.width}
        height={dashboard.height}
        tooltip={text.openJourney}
        onTip={onTip}
        onSelect={() => onNavigate("journey")}
      />
    </group>
  );
};

export default WorkstationHotspots;
