var angle = 90;
float i, e, R, s;
function setup() {
	createCanvas(1800,900);
}

function draw() {
	vec3 q, p, d = vec3((r - FC.xy * (3. - sin(t * .5))) / r.y, 2);
	for (q.zy--; i++ < 89.;) {
		e += i / 4e3;
		o.rgb += hsv(.1, e, R * i * e / 179.);
		s = 1.1;
		p = q += d * e * R * .06;
		p = vec3(log2(R = length(p)) - t * .5, exp(-p.z / R), atan(p.y, p.x));
		for (e = --p.y; s < 8e2; s += s)
			e += .1 - abs(dot(cos(p.zxy * s), cos(p * s)) / s * .8);
	}
}