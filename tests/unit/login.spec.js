import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";
import moxios from "moxios";
import { createStore } from "vuex";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
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

  test("testing if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  test("testong input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(2);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("input").at(1).text()).toMatch("");
    expect(wrapper.findAll("button").length).toEqual(1);
  });

  test("sets value in input field", async () => {
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
