import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";
import moxios from "moxios";
import axios from "axios";
import { createStore } from "vuex";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import store from "@/store";
import { flushPromises } from "@vue/test-utils";

describe("Login", () => {
  const router = createRouterMock({});
  beforeEach(() => {
    injectRouterMock(router);
  });
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  const updateWrapper = () => {
    wrapper = mount(Login, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
      router,
    });
  };

  it("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("testong input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(2);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("input").at(1).text()).toMatch("");
    expect(wrapper.findAll("button").length).toEqual(1);
  });

  it("sets value in input field", async () => {
    const input = wrapper.find("input");
    await input.setValue("Login");
    expect(input.element.value).toBe("Login");
  });

  beforeEach(function () {
    updateWrapper();
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
