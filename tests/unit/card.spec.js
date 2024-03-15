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
        address: "byepass road",
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
  //   console.log(wrapper.vm.isAdmin);
  test("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
