<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Preloader></Preloader>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="content-wrapper">
        <ContentHeader></ContentHeader>

        <section class="content">
          <div class="container-fluid d-flex flex-column align-items-center">
            <router-view />
          </div>
        </section>
      </div>

      <Footer></Footer>
      <ContentSidebar></ContentSidebar>
    </div>
  </body>
</template>

<script>
// import $ from "jquery";
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";

import Preloader from "./dashboard/Preloader.vue";
import ContentHeader from "./dashboard/ContentHeader.vue";
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ContentSidebar from "./dashboard/ContentSidebar.vue";

export default {
  name: "App",

  components: {
    Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ContentSidebar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
