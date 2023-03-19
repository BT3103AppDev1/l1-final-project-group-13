<!-- <template>
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
</style> -->
<template>
  <div>
    <div class="login-login">
      <img
        src="../assets/image11038-hg9i-800h.png.png"
        alt="image11038"
        class="login-image1"
      />
      <div class="login-navbar">
        <div class="login-logo">
          <span class="login-text"><span>Réstormé</span></span>
        </div>
      </div>
      <div class="login-frame1">
        <span class="login-text02"><span>Welcome!</span></span>
        <span class="login-text04"><span>It’s good to see you back</span></span>
        <div class="login-frame7">
          <div class="login-input-full">
            <div class="login-group6">
              <span class="login-text06"><span>Username</span></span>
              <span class="login-text08"><span>azakost</span></span>
            </div>
          </div>
          <div class="login-input-full1">
            <div class="login-group61">
              <span class="login-text10"><span>Password</span></span>
              <span class="login-text12"><span>***********</span></span>
            </div>
          </div>
          <button class="login-button-resize">
            <span class="login-text14"><span>Login</span></span>
          </button>
        </div>
        <div class="login-frame8">
          <div class="login-group10">
            <div class="login-group12">
              <div class="login-group11">
                <span class="login-text16">
                  <span>
                    New to Réstormé?
                    <span v-html="raw4upe"></span>
                  </span>
                </span>
                <img
                  src="../assets/logo.svg"
                  alt="Rectangle21039"
                  class="login-rectangle2"
                />
              </div>
              <span class="login-text18"><span>Register</span></span>
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
  props: {},
  data() {
    return {
      raw4upe: ' ',
    };
  },
};
</script>

<style scoped>
.login-login {
  width: 100%;
  height: 900px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: var(--dl-color-default-bg);
}
.login-image1 {
  top: 114px;
  left: 513px;
  width: 880px;
  height: 716px;
  position: absolute;
  border-color: transparent;
}
.login-navbar {
  top: 0px;
  left: 0px;
  width: 1440px;
  height: 84px;
  display: flex;
  overflow: hidden;
  position: absolute;
  box-sizing: content-box;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: rgba(234, 234, 234, 1);
  border-style: solid;
  border-width: 1px;
  background-color: rgba(255, 255, 255, 1);
}
.login-logo {
  top: 22px;
  left: 50px;
  width: 115px;
  height: 40px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-text {
  top: 13.999969482421875px;
  left: 40px;
  color: var(--dl-color-default-titeltextcolor);
  height: auto;
  position: absolute;
  font-size: 16px;
  align-self: auto;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-frame1 {
  top: 0px;
  left: 0px;
  width: 580px;
  display: flex;
  padding: 193px 100px;
  overflow: hidden;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  flex-direction: column;
}
.login-text02 {
  color: rgba(0, 0, 0, 1);
  height: auto;
  font-size: 24px;
  align-self: auto;
  font-style: Black;
  text-align: left;
  font-family: Roboto;
  font-weight: 900;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 20px;
  text-decoration: none;
}
.login-text04 {
  color: rgba(0, 0, 0, 1);
  width: 380px;
  height: auto;
  font-size: 18px;
  align-self: auto;
  font-style: Light;
  text-align: left;
  font-family: Roboto;
  font-weight: 300;
  line-height: 30px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 20px;
  text-decoration: none;
}
.login-frame7 {
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  border-color: transparent;
  margin-bottom: 20px;
  flex-direction: column;
}
.login-input-full {
  width: 380px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: rgba(234, 234, 234, 1);
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 1);
}
.login-group6 {
  top: 8px;
  left: 15px;
  width: 326px;
  height: 26px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-text06 {
  color: var(--dl-color-default-subtitletextcolor);
  width: 226px;
  height: auto;
  position: absolute;
  font-size: 8px;
  align-self: auto;
  font-style: Light;
  text-align: left;
  font-family: Roboto;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-text08 {
  top: 11px;
  color: rgba(0, 0, 0, 1);
  width: 326px;
  height: auto;
  position: absolute;
  font-size: 13px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-input-full1 {
  width: 380px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: rgba(234, 234, 234, 1);
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 1);
}
.login-group61 {
  top: 8px;
  left: 15px;
  width: 326px;
  height: 26px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-text10 {
  color: var(--dl-color-default-subtitletextcolor);
  width: 226px;
  height: auto;
  position: absolute;
  font-size: 8px;
  align-self: auto;
  font-style: Light;
  text-align: left;
  font-family: Roboto;
  font-weight: 300;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-text12 {
  top: 11px;
  color: rgba(0, 0, 0, 1);
  width: 326px;
  height: auto;
  position: absolute;
  font-size: 13px;
  align-self: auto;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-button-resize {
  width: 380px;
  height: 38px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  border-radius: 5px;
  background-color: var(--dl-color-default-primary2);
}
.login-text14 {
  top: 12px;
  left: 172px;
  color: var(--dl-color-default-white);
  height: auto;
  position: absolute;
  font-size: 13px;
  align-self: auto;
  font-style: Black;
  text-align: center;
  font-family: Roboto;
  font-weight: 900;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
}
.login-frame8 {
  width: 380px;
  height: 95px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
}
.login-group10 {
  top: 19px;
  left: 78px;
  width: 225px;
  height: 28px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-group12 {
  top: 0px;
  left: 0px;
  width: 225px;
  height: 28px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  border-radius: 0px 0px 0px 0px;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-group11 {
  top: 0px;
  left: 0px;
  width: 225px;
  height: 28px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  border-radius: 0px 0px 0px 0px;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
}
.login-text16 {
  top: 7px;
  color: rgba(0, 0, 0, 1);
  width: 162px;
  height: auto;
  position: absolute;
  font-size: 13px;
  align-self: auto;
  font-style: Black;
  text-align: center;
  font-family: Roboto;
  font-weight: 900;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.login-rectangle2 {
  top: 0px;
  left: 157px;
  width: 68px;
  height: 28px;
  position: absolute;
}
.login-text18 {
  top: 6px;
  left: 162px;
  color: rgba(0, 0, 0, 1);
  width: 58px;
  height: auto;
  position: absolute;
  font-size: 13px;
  align-self: auto;
  font-style: Black;
  text-align: center;
  font-family: Roboto;
  font-weight: 900;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
</style>
