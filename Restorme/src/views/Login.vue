<template>
  <div class="container-center-horizontal">
    <div class="login screen">
      <div class="overlap-group2">
        <img class="image-1" src="image-1.png" alt="image 1" />
        <div class="navbar">
          <div class="rstorm valign-text-middle">Réstormé</div>
          <img class="emoji" src="emoji.svg" alt="Emoji" />
        </div>
        <div class="frame-1">
          <h1 class="title valign-text-middle">Welcome!</h1>
          <p class="its-good-to-see-you-back valign-text- middle">
            It's good to see you back
          </p>
          <div class="frame-7">
            <input-full username="Username" azakost="azakost" />
            <input-full username="Password" azakost="azahost" />
            <div class="button-resize">
              <div class="login-1 valign-text-middle">Login</div>
            </div>
          </div>
          <div class="frame-8">
            <div class="group-10">
              <div class="overlap-group1">
                <div class="overlap-group">
                  <div
                    class="register valign-te xt-middle roboto- black-black-13px"
                  >
                    New to Restorme?
                  </div>
                  <img
                    class="rectangle-2"
                    src="rectangle-2.svg"
                    alt="Rectangle 2"
                  />
                </div>
                <div class="place valign-text-middle roboto-black- black-13px">
                  Register
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style>
.navbar {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid;
  border-color: #eaeaea;
  display: flex;
  gap: 5965px;
  height: 86px;
  overflow: hidden;
  width: 1442px;
}

.rstorm {
  color: var(--black);
  font-family: var(--font-family- roboto);
  font-size: var(--font-size-m);
  font-weight: 400;
  height: 19px;
  letter-spacing: 0.8px;
  line-height: normal;
  margin-left: 90px;
  margin-top: 5px;
  min-width: 75px;
  text-shadow: 0px 4px 4px #00000040;
}
.emoji {
  align-self: flex-end;
  height: 40px;
  margin-bottom: -926px;
  width: 40px;
}
</style>
