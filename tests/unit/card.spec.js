import { mount } from "@vue/test-utils";
import moxios from "moxios";
import { createStore } from "vuex";
// import {
//   VueRouterMock,
//   createRouterMock,
//   injectRouterMock,
// } from "vue-router-mock";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import Card from "@/components/Card.vue";
import store from "@/store";

describe("add", () => {
  const router = createRouterMock({});
  beforeEach(() => {
    injectRouterMock(router);
  });
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  const updateWrapper = () => {
    wrapper = mount(Card, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
      router,
      props: {
        name: "By highway",
        address: "National Highway Road",
        avgRating: 4.3,
        contact: 1243545,
        cloudinaryImageId: "https://unknown.com",
        id: "1234",
        fav: "true",
      },
      data() {
        return {
          isAdmin: true,
          isOpen: false,
          userId: "c0a3",
          favourites: [],
        };
      },
    });
  };

  test("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("testing if modal is showing after click on delete button", async () => {
    expect(wrapper.vm.isOpen).toEqual(false);
    const deleteIcon = wrapper.find("[data-test-id='modal']");
    await deleteIcon.trigger("click");
    expect(wrapper.vm.isOpen).toEqual(true);
  });
  test("testing if name of restaurant is rendered", async () => {
    expect(wrapper.html()).toContain("By highway");
  });
  test("testing if address of restaurant is rendered", async () => {
    expect(wrapper.html()).toContain("National Highway Road");
  });
  test("testing if avgRating of restaurant is rendered", async () => {
    expect(wrapper.html()).toContain("4.3");
  });
  test("testing if contact of restaurant is rendered", async () => {
    expect(wrapper.html()).toContain("1243545");
  });
  test("testing if image of restaurant is rendered", async () => {
    expect(wrapper.html()).toContain("https://unknown.com");
  });

  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
