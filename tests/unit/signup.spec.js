import { mount } from "@vue/test-utils";
import Signup from "@/components/Signup.vue";
import moxios from "moxios";
import { createStore } from "vuex";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import store from "@/store";

describe("Signup", () => {
  const router = createRouterMock({});
  beforeEach(() => {
    injectRouterMock(router);
  });
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  const updateWrapper = () => {
    wrapper = mount(Signup, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
      router,
    });
  };

  it("test if component is mounted", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("testong input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(3);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("input").at(1).text()).toMatch("");
    expect(wrapper.findAll("input").at(2).text()).toMatch("");
    expect(wrapper.findAll("button").length).toEqual(1);
  });

  it("sets value in input field", async () => {
    const input = wrapper.find("input");
    await input.setValue("Sign up");
    expect(input.element.value).toBe("Sign up");
  });

  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
