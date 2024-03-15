import { mount } from "@vue/test-utils";
import Review from "@/components/Review.vue";
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
    wrapper = mount(Review, {
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
  test("testing input fields", async () => {
    expect(wrapper.findAll("input").length).toEqual(1);
    expect(wrapper.findAll("select").length).toEqual(1);
    expect(wrapper.findAll("select").at(0).text()).toMatch("");
    expect(wrapper.findAll("input").at(0).text()).toMatch("");
    expect(wrapper.findAll("button").length).toEqual(1);
  });

  test("sets value in input field", async () => {
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
