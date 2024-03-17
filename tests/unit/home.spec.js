import { mount, shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";
import Navbar from "@/dashboard/Navbar.vue";
import Footer from "@/dashboard/Footer.vue";
import Sidebar from "@/dashboard/Sidebar.vue";
import Card from "@/components/Card.vue";
import moxios from "moxios";
import { createStore } from "vuex";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import store from "@/store";
import { flushPromises } from "@vue/test-utils";

describe("Home", () => {
  const router = createRouterMock({});
  beforeEach(() => {
    injectRouterMock(router);
  });
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  const updateWrapper = () => {
    wrapper = mount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
          $store: store,
        },
        plugins: [store],
      },
      router,
    });
  };

  it("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("AdminLte Navbar", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
  });
  it("AdminLte Sidebar", () => {
    const wrapper = shallowMount(Sidebar);
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true);
  });
  it("AdminLte Footer", () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });

  it("rendering Card component", async () => {
    const wrapper = shallowMount(Card);
    await flushPromises();
    expect(wrapper.findComponent(Card).exists()).toBe(true);
  });

  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
