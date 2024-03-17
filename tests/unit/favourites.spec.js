import { mount, shallowMount } from "@vue/test-utils";
import Favourites from "@/components/Favourites.vue";
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
    wrapper = mount(Favourites, {
      data() {
        return {
          restaurant: {
            name: "test",
            address: "testing",
            avgRating: 3,
            contact: 343123,
            cloudinaryImageId: "https://unknown.com",
            id: "32",
          },
          details: [
            {
              name: "test",
              address: "testing",
              avgRating: 3,
              contact: 343123,
              cloudinaryImageId: "https://unknown.com",
              id: "32",
            },
          ],
        };
      },
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

  it("props check", async () => {
    expect(wrapper.vm.restaurant.name).toBe("test");
    expect(wrapper.vm.restaurant.address).toBe("testing");
    expect(wrapper.vm.restaurant.contact).toBe(343123);
    expect(wrapper.vm.restaurant.avgRating).toBe(3);
    expect(wrapper.vm.restaurant.cloudinaryImageId).toBe("https://unknown.com");
    expect(wrapper.vm.restaurant.id).toBe("32");
    expect(wrapper.vm.details).toEqual([
      {
        name: "test",
        address: "testing",
        avgRating: 3,
        contact: 343123,
        cloudinaryImageId: "https://unknown.com",
        id: "32",
      },
    ]);
    expect(wrapper.findAllComponents(Card).length).toBe(1);
    expect(wrapper.find("button").text()).toEqual("Remove");
  });

  beforeEach(function () {
    updateWrapper();
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
