let scene, camera, renderer, currentVisualization;
const container = document.getElementById('container');
const home = document.getElementById('home');
const backButton = document.getElementById('back-button');
const description = document.getElementById('description');
const sequenceTitle = document.getElementById('sequence-title');
const sequenceDescription = document.getElementById('sequence-description');

document.querySelectorAll('#number-list li').forEach(item => {
  item.addEventListener('click', () => {
    const sequence = item.getAttribute('data-sequence');
    showVisualization(sequence);
  });
});

backButton.addEventListener('click', () => {
  hideVisualization();
});

function showVisualization(sequence) {
  home.style.display = 'none';
  backButton.style.display = 'block';
  container.style.display = 'block';
  description.style.display = 'block';
  
  switch(sequence) {
    case 'fibonacci':
      sequenceTitle.textContent = 'Fibonacci Sequence';
      sequenceDescription.textContent = 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. It appears in various natural phenomena such as the arrangement of leaves, the branching of trees, and the spirals of shells.';
      initFibonacci();
      break;
    case 'prime':
      sequenceTitle.textContent = 'Prime Numbers';
      sequenceDescription.textContent = 'Prime numbers are numbers greater than 1 that have no positive divisors other than 1 and themselves. They play a crucial role in number theory and have applications in cryptography and computer science.';
      initPrimeNumbers();
      break;
    case 'golden-ratio':
      sequenceTitle.textContent = 'Golden Ratio';
      sequenceDescription.textContent = 'The Golden Ratio is a special number approximately equal to 1.618. It is often encountered in art, architecture, and nature, representing aesthetically pleasing proportions.';
      initGoldenRatio();
      break;
    case 'triangular':
      sequenceTitle.textContent = 'Triangular Numbers';
      sequenceDescription.textContent = 'Triangular numbers are the count of objects that can form an equilateral triangle. They represent a simple pattern of growth and have various applications in combinatorics and number theory.';
      initTriangularNumbers();
      break;
    case 'euler':
      sequenceTitle.textContent = "Euler's Number";
      sequenceDescription.textContent = "Euler's Number, denoted as e, is an irrational number approximately equal to 2.71828. It is the base of natural logarithms and appears in various areas of mathematics, including calculus, complex analysis, and number theory.";
      initEulersNumber();
      break;
    case 'lucas':
      sequenceTitle.textContent = 'Lucas Numbers';
      sequenceDescription.textContent = 'The Lucas numbers are similar to the Fibonacci sequence but start with 2 and 1. They appear in biological settings and computer algorithms.';
      initLucasNumbers();
      break;
    default:
      console.error('Unknown sequence:', sequence);
  }
}

function hideVisualization() {
  if (currentVisualization && currentVisualization.dispose) {
    currentVisualization.dispose();
  }
  currentVisualization = null;
  container.style.display = 'none';
  description.style.display = 'none';
  backButton.style.display = 'none';
  home.style.display = 'block';
}

function initScene() {
  if (renderer) {
    renderer.dispose();
    container.innerHTML = '';
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  if (currentVisualization && currentVisualization.animate) {
    currentVisualization.animate();
  }
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initFibonacci() {
  initScene();

  const points = [];
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < 1000; i++) {
    const angle = i * phi;
    const radius = Math.sqrt(i) * 0.1;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.5);
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffa500 });
  const spiral = new THREE.Line(geometry, material);
  scene.add(spiral);

  currentVisualization = {
    animate: function() {
      spiral.rotation.x += 0.001;
      spiral.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(spiral);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function initPrimeNumbers() {
  initScene();

  const points = [];
  const primes = sieveOfEratosthenes(1000);
  const maxPrime = primes[primes.length - 1];
  const scale = 0.05;

  primes.forEach((prime, index) => {
    const angle = prime * 0.3;
    const radius = Math.sqrt(prime) * scale;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.5);
    points.push(new THREE.Vector3(x, y, z));
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.05 });
  const pointsObject = new THREE.Points(geometry, material);
  scene.add(pointsObject);

  currentVisualization = {
    animate: function() {
      pointsObject.rotation.x += 0.001;
      pointsObject.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(pointsObject);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function sieveOfEratosthenes(limit) {
  const sieve = [];
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (!sieve[i]) {
      primes.push(i);
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
}

function initGoldenRatio() {
  initScene();

  const points = [];
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < 500; i++) {
    const angle = i * phi;
    const radius = 1.5 * Math.sqrt(i);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.3);
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xadd8e6 });
  const spiral = new THREE.Line(geometry, material);
  scene.add(spiral);

  currentVisualization = {
    animate: function() {
      spiral.rotation.x += 0.001;
      spiral.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(spiral);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function initTriangularNumbers() {
  initScene();

  const points = [];
  const triangularNumbers = getTriangularNumbers(1000);
  const scale = 0.05;

  triangularNumbers.forEach((num, index) => {
    const angle = num * 0.3;
    const radius = Math.sqrt(num) * scale;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.4);
    points.push(new THREE.Vector3(x, y, z));
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.PointsMaterial({ color: 0x1e90ff, size: 0.05 });
  const pointsObject = new THREE.Points(geometry, material);
  scene.add(pointsObject);

  currentVisualization = {
    animate: function() {
      pointsObject.rotation.x += 0.001;
      pointsObject.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(pointsObject);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function getTriangularNumbers(limit) {
  const triangular = [];
  for (let n = 1; n <= limit; n++) {
    triangular.push(n * (n + 1) / 2);
  }
  return triangular;
}

function initEulersNumber() {
  initScene();

  const points = [];
  const e = Math.E;
  for (let i = 0; i < 1000; i++) {
    const angle = i * 0.1;
    const radius = Math.pow(e, i * 0.001);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.2);
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff69b4 });
  const spiral = new THREE.Line(geometry, material);
  scene.add(spiral);

  currentVisualization = {
    animate: function() {
      spiral.rotation.x += 0.001;
      spiral.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(spiral);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function initLucasNumbers() {
  initScene();

  const points = [];
  const lucasSequence = getLucasNumbers(1000);
  const scale = 0.05;

  lucasSequence.forEach((num, index) => {
    const angle = num * 0.3;
    const radius = Math.sqrt(num) * scale;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(angle * 0.2);
    points.push(new THREE.Vector3(x, y, z));
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x8a2be2 });
  const spiral = new THREE.Line(geometry, material);
  scene.add(spiral);

  currentVisualization = {
    animate: function() {
      spiral.rotation.x += 0.001;
      spiral.rotation.y += 0.001;
    },
    dispose: function() {
      scene.remove(spiral);
      geometry.dispose();
      material.dispose();
    }
  };

  animate();
}

function getLucasNumbers(limit) {
  const lucas = [2, 1];
  for (let i = 2; i < limit; i++) {
    lucas[i] = lucas[i - 1] + lucas[i - 2];
  }
  return lucas;
}