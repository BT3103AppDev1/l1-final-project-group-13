<template>
  <div class="navbar">
    <img src="../assets/logo.png" alt="Logo" class="navbar-logo" />
    <p class="navbar-text">Restormé</p>
  </div>
</template>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 20px;
  z-index: 999;
}

.navbar-logo {
  height: 30px;
  margin-right: 12px;
}

.navbar-text {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}
</style>
