
#ifdef SIM_PLANE
    float x = vUv.x;
    float y = vUv.y;
    vec2 coords = vUv * 2.0 - 1.0;

    float height = (sin(((coords.x + abs(coords.y)) * 4.0 + uTime) * 1.)) * 0.1 + (sin((coords.y * 4.0 + uTime) * 0.9)) * 0.1;

    vec3 targetPos = vec3(coords.x  * 1.5 + rand(vec2(coords.x))/ 1000.0 + rand(vec2(height)) / 5.0,height / 1.5 + rand(vec2(height)) / 11.0, y / 1.2);
    targetPos *= 3.0;
#endif

#ifdef SIM_CUBE
    vec3 targetPos = vec3(vUv.x, vUv.y, rand(vUv)) * 2.0 - 1.0;
    targetPos *= 2.0;
#endif

#ifdef SIM_DISC
    // cylindrical coords
    float radius = vUv.y;
    float theta = vUv.x * M_2PI;
    vec3 targetPos = vec3(
        radius * sin(theta),
        0.0,
        radius * cos(theta)
    );
    targetPos *= 3.0;
#endif

#ifdef SIM_SPHERE
    // sphere, continuous along vUv.y
    vec2 coords = vUv;
    coords.x = coords.x * M_2PI - M_PI; // theta (lat)
    coords.y = coords.y * M_PI;         // phi (long)
    vec3 sphereCoords = vec3(
        sin(coords.y) * cos(coords.x),
        cos(coords.y),
        sin(coords.y) * sin(coords.x)
    );

    float r = 1.0;
    vec3 targetPos = r * sphereCoords;
    targetPos *= 2.0;
#endif

#ifdef SIM_BALL
    // sphere coords, rand radius, offset y+0.5 for snoise vel
    vec2 coords = vUv;
    coords.x = coords.x * M_2PI - M_PI;
    coords.y = coords.y * M_PI;
    vec3 sphereCoords = vec3(
        sin(coords.y) * cos(coords.x),
        cos(coords.y),
        sin(coords.y) * sin(coords.x)
    );
    vec3 targetPos = sphereCoords * rand(vUv);
    targetPos *= 2.0;
#endif

#if defined(SIM_PLANE) || defined(SIM_SPHERE) || defined(SIM_BALL) || defined(SIM_CUBE) || defined(SIM_DISC)
    vec3 toTarget = targetPos - currPos;
    float toTargetLength = length(toTarget);
    if (!EQUALSZERO(toTargetLength))
        accel += uShapeAccel * toTarget/toTargetLength;
#endif

#ifdef SIM_NOISE
    accel += 0.2 * uShapeAccel * curlNoise(currPos);
#endif