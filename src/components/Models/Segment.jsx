import { useMemo } from "react";
import * as THREE from "three";

const UP = new THREE.Vector3(0, 1, 0);

/**
 * A cylinder stretched between two points. Used for lamp arms, branch lines
 * and any other "rod" in the procedural models.
 */
const Segment = ({ start, end, radius = 0.02, radialSegments = 12, children, ...props }) => {
  const startKey = start.join(",");
  const endKey = end.join(",");

  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(b, a);
    return {
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(UP, direction.clone().normalize()),
      length: direction.length(),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startKey, endKey]);

  return (
    <mesh position={position} quaternion={quaternion} {...props}>
      <cylinderGeometry args={[radius, radius, length, radialSegments]} />
      {children}
    </mesh>
  );
};

export default Segment;
