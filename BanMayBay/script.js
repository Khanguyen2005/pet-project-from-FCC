const plane = document.getElementById("plane");
const heartsContainer = document.getElementById("hearts");
let planePositionX = window.innerWidth / 2;
let planePositionY = window.innerHeight - 70;
const bullets = [];
const enemies = [];
let enemyHitCount = {};
let playerLives = 5;
let enemyCount = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    planePositionX -= 10;
  } else if (event.key === "ArrowRight") {
    planePositionX += 10;
  } else if (event.key === "ArrowUp") {
    planePositionY -= 10;
  } else if (event.key === "ArrowDown") {
    planePositionY += 10;
  } else if (event.key === " ") {
    shootBullet();
  }
  plane.style.left = `${planePositionX}px`;
  plane.style.top = `${planePositionY}px`;
});

function shootBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${planePositionX + 22}px`; // Điều chỉnh vị trí đạn
  bullet.style.top = `${planePositionY}px`;
  document.body.appendChild(bullet);
  bullets.push(bullet);
  moveBullet(bullet);
}

function moveBullet(bullet) {
  const interval = setInterval(() => {
    const bulletTop = parseInt(bullet.style.top);
    if (bulletTop <= 0) {
      bullet.remove();
      clearInterval(interval);
    } else {
      bullet.style.top = `${bulletTop - 10}px`;
      checkBulletCollision(bullet, interval);
    }
  }, 50);
}

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = `${Math.random() * window.innerWidth}px`;
  enemy.style.top = `0px`;
  document.body.appendChild(enemy);
  enemies.push(enemy);
  enemyHitCount[enemy] = 0;
  enemyCount++; // Tăng số quái
  updateEnemyCount();
  moveEnemy(enemy);
}

function moveEnemy(enemy) {
  const interval = setInterval(() => {
    const enemyTop = parseInt(enemy.style.top);
    if (enemyTop >= window.innerHeight) {
      enemy.remove();
      clearInterval(interval);
      playerLives--;
      checkPlayerLives();
      triggerWarning();
    } else {
      enemy.style.top = `${enemyTop + 5}px`;
      checkEnemyCollision(enemy, interval);
    }
  }, 100);
}

function checkBulletCollision(bullet, bulletInterval) {
  enemies.forEach((enemy) => {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top
    ) {
      bullet.remove();
      clearInterval(bulletInterval);
      enemyHitCount[enemy]++;
      if (enemyHitCount[enemy] >= 3) {
        enemy.remove();
        delete enemyHitCount[enemy];
        enemyCount--; // Giảm số quái
        updateEnemyCount();
      }
    }
  });
}

function checkEnemyCollision(enemy, enemyInterval) {
  const planeRect = plane.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  if (
    planeRect.left < enemyRect.right &&
    planeRect.right > enemyRect.left &&
    planeRect.top < enemyRect.bottom &&
    planeRect.bottom > enemyRect.top
  ) {
    enemy.remove();
    clearInterval(enemyInterval);
    playerLives--;
    checkPlayerLives();
  }
}

function checkPlayerLives() {
  updateHearts(); // Cập nhật số mạng
  if (playerLives <= 0) {
    alert("Game Over!");
    window.location.reload();
  }
}

function updateHearts() {
  console.log("Updating hearts"); // Kiểm tra xem hàm có được gọi không
  heartsContainer.innerHTML = ""; // Xóa hết các trái tim cũ
  for (let i = 0; i < playerLives; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heartsContainer.appendChild(heart);
  }
}

function updateEnemyCount() {
  document.getElementById("enemyCount").textContent = `Enemies: ${enemyCount}`;
}

function triggerWarning() {
  const gameArea = document.getElementById("gameArea");
  gameArea.classList.add("warning");
  setTimeout(() => {
    gameArea.classList.remove("warning");
  }, 1000); // Đổi nền sang đỏ trong 1 giây
}

// Tạo kẻ thù mới mỗi 3 giây
setInterval(createEnemy, 3000);
