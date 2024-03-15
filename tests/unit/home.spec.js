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
describe("home", () => {
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

  test("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  //   test("testing input fields", async () => {
  //     expect(wrapper.findAll("input").length).toEqual(1);
  //     expect(wrapper.findAll("select").length).toEqual(1);
  //     expect(wrapper.findAll("select").at(0).text()).toMatch("");
  //     expect(wrapper.findAll("input").at(0).text()).toMatch("");
  //     expect(wrapper.findAll("button").length).toEqual(1);
  //   });

  //   test("sets value in input field", async () => {
  //     const input = wrapper.find("input");

  //     await input.setValue("Update");

  //     expect(input.element.value).toBe("Update");
  //   });
  test("AdminLte Navbar", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
  });
  test("AdminLte Sidebar", () => {
    const wrapper = shallowMount(Sidebar);
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true);
  });
  test("AdminLte Footer", () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });

  // test("rendering Card component", async () => {
  //   const wrapper = shallowMount(Card);
  //   await flushPromises();
  //   expect(wrapper.findComponent(Card).exists()).toBe(true);
  // });

  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
