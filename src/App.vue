<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Preloader></Preloader>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="content-wrapper">
        <ContentHeader></ContentHeader>

        <section class="content">
          <div class="container-fluid">
            <router-view />
            <!-- <filter-todos></filter-todos> -->
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
// import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
// import "../node_modules/admin-lte/plugins/select2/css/select2.min.css";

import Preloader from "./dashboard/Preloader.vue";
import ContentHeader from "./dashboard/ContentHeader.vue";
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ContentSidebar from "./dashboard/ContentSidebar.vue";
// import FilterTodos from "./components/Filter.vue";

export default {
  name: "App",

  components: {
    // FilterTodos,
    Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ContentSidebar,
  },
  methods: {
    initializeSelect2() {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Initialize Select2 Elements
      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>

<!-- <template>
  <Navbar />
  <Sidebar />
  <Preloader />
  <ContentHeader />
  <ContentSidebar />
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Preloader from "./components/Preloader.vue";
import ContentHeader from "./components/ContentHeader.vue";
import ContentSidebar from "./components/ContentSidebar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Preloader,
    ContentHeader,
    ContentSidebar,
    Footer,
  },
};
</script> -->
