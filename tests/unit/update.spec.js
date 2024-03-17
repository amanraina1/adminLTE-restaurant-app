import { mount } from "@vue/test-utils";
import Update from "@/components/Update.vue";
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
    wrapper = mount(Update, {
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
    expect(wrapper.findAll("input").length).toEqual(5);
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("input").at(1).text()).toMatch("");
    expect(wrapper.findAll("input").at(2).text()).toMatch("");
    expect(wrapper.findAll("input").at(3).text()).toMatch("");
    expect(wrapper.findAll("input").at(4).text()).toMatch("");
    expect(wrapper.findAll("button").length).toEqual(1);
    expect(wrapper.findAll("button").at(0).text()).toMatch("Update Restaurant");
  });

  it("sets value in input field", async () => {
    const input = wrapper.find("input");
    await input.setValue("Update");
    expect(input.element.value).toBe("Update");
  });

  beforeEach(function () {
    updateWrapper();

    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });
});
