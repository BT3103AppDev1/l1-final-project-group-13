<template>
  <sidebar-menu
    :menu="menu"
    :theme="selectedTheme"
    :hideToggle="true"
    :relative="true"
  />
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

export default {
  name: 'SidebarRouter',
  components: {
    SidebarMenu,
  },
  data() {
    return {
      menu: [
        {
          header: 'Menu',
        },
        {
          href: '/home',
          title: 'Home',
        },
        {
          href: '/profile',
          title: 'Profile',
        },
        {
          href: '/resumes',
          title: 'Resumes',
        },
        {
          href: '/help',
          title: 'Help',
        },
        {
          href: '/homeWithZeroResumes',
          title: 'Home with zero resumes (Test)',
        },
        {
          href: '/uploadResumes',
          title: 'Upload',
        },
        //{
        //  href: '/previewer',
        //  title: 'Previewer',
        //},


      ],
      selectedTheme: 'white-theme',
    };
  },
};
</script>

<style>
.v-sidebar-menu.vsm_expanded {
  padding: 20px;
  /* background-color: aqua; */
  margin-top: 8px;
  border-right: 2px solid #c8c8c8;
  margin-right: 10px;
}
</style>
