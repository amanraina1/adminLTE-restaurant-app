import store from "@/store";
import axios from "axios";

jest.mock("axios");

describe("store", () => {
  it("should add a restaurant and add it to the state", async () => {
    const newRestaurant = {
      name: "Subway",
      contact: 288766543,
      address: "Sector 90",
      cloudinaryImageId:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
      avgRating: 5,
      reviews: [],
    };
    // set up initial state
    store.state.restaurants = [
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
      },
    ];
    // mocking the axios call
    axios.post.mockResolvedValue({ data: newRestaurant });

    // call the action
    await store.dispatch("addRestaurants", newRestaurant);

    // assertion if the url is correct or not
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/restaurants",
      newRestaurant
    );

    // assertion
    expect(store.state.restaurants).toEqual([
      {
        name: "Subway",
        contact: 288766543,
        address: "Sector 90",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [],
      },
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
      },
    ]);
  });
  it("fetches restaurant from the API and commits them to the store", async () => {
    // mock the axios.get method
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: [
          {
            name: "McDonald's",
            contact: 3456675,
            address: "Sector 48",
            cloudinaryImageId:
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
            avgRating: 5,
            reviews: [
              {
                id: "4876",
                name: "Peter",
                message: "Nice restaurant",
                rating: 5,
              },
              {
                id: "4ca6",
                name: "Naruto",
                message: "Good Ambiemce",
                rating: 4,
              },
              {
                id: "e12c",
                name: "Aman Raina",
                message: "Careful and good staff",
                rating: 4,
              },
            ],
            id: "411518",
          },
        ],
      })
    );

    // call the action
    await store.dispatch("fetchRestaurants");

    // assert that axios.get called with correct url
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/restaurants");

    // assert that the correct mutation was committed
    expect(store.state.restaurants).toEqual([
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "411518",
      },
    ]);
  });
  it("should edit a restaurant and add it to the state", async () => {
    // Arrange
    const newRestaurant = {
      name: "Subway New",
      contact: 1234,
      address: "Sector 90",
      cloudinaryImageId:
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
      avgRating: 5,
      reviews: [
        {
          id: "4876",
          name: "Peter",
          message: "Nice restaurant",
          rating: 5,
        },
        {
          id: "4ca6",
          name: "Naruto",
          message: "Good Ambiemce",
          rating: 4,
        },
        {
          id: "e12c",
          name: "Aman Raina",
          message: "Careful and good staff",
          rating: 4,
        },
      ],
      id: "12345",
    };
    // set up initial state
    store.state.restaurants = [
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "411518",
      },
      {
        name: "Subway",
        contact: 288766543,
        address: "Sector 90",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "12345",
      },
    ];
    // mock the axios.post call to return a fake response
    axios.put.mockResolvedValue({ data: newRestaurant });

    // Act
    // call the addTodo action with the title of the new todo
    await store.dispatch("updatedRestaurant", newRestaurant);

    // assert the url
    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3000/restaurants/${newRestaurant.id}`,
      newRestaurant
    );

    // Assert
    // assert that the new restaurant was added to the state
    expect(store.state.restaurants).toEqual([
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "411518",
      },
      newRestaurant,
    ]);
  });
  it("should delete a restaurant and remove it from the state", async () => {
    // Arrange
    const restaurantId = "411518";
    // set up initial state
    store.state.restaurants = [
      {
        name: "McDonald's",
        contact: 3456675,
        address: "Sector 48",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "411518",
      },
      {
        name: "Subway",
        contact: 288766543,
        address: "Sector 90",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "12345",
      },
    ];
    // mock the axios.delete call to return a fake response

    axios.delete.mockResolvedValue({});

    // Act
    // call the removeRestaurants action with the id of the restaurant to delete
    await store.dispatch("removeRestaurants", restaurantId);

    // assert the url
    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/restaurants/${restaurantId}`
    );

    // Assert
    // assert that the restaurant with id 411518 was removed from the state
    expect(store.state.restaurants).toEqual([
      {
        name: "Subway",
        contact: 288766543,
        address: "Sector 90",
        cloudinaryImageId:
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ecd32b841549ce6bfd993260a2086c1f",
        avgRating: 5,
        reviews: [
          {
            id: "4876",
            name: "Peter",
            message: "Nice restaurant",
            rating: 5,
          },
          {
            id: "4ca6",
            name: "Naruto",
            message: "Good Ambiemce",
            rating: 4,
          },
          {
            id: "e12c",
            name: "Aman Raina",
            message: "Careful and good staff",
            rating: 4,
          },
        ],
        id: "12345",
      },
    ]);
  });
  it("should add a user and add it to the state", async () => {
    // Arrange

    const info = {
      id: "c0a3",
      name: "Admin",
      email: "admin@example.com",
      password: "admin",
      favourites: ["5656"],
      isAdmin: true,
    };
    // set up initial state
    store.state.users = [
      {
        id: "c0a3",
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        favourites: [],
        isAdmin: true,
      },
    ];
    // mock the axios.post call to return a fake response
    axios.patch.mockResolvedValue({ data: info });

    // Act
    // call the addTodo action with the title of the new todo
    await store.dispatch("addFavRestaurant", info);

    // assert the url
    expect(axios.patch).toHaveBeenCalledWith(
      `http://localhost:3000/users/${info.id}`,
      { favourites: info.favourites }
    );

    // Assert
    // assert that the new restaurant was added to the state

    expect(store.state.users).toEqual([
      {
        id: "c0a3",
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        favourites: ["5656"],
        isAdmin: true,
      },
    ]);
  });
  it("fetches restaurant from the API and commits them to the store", async () => {
    // mock the axios.get method
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: "c0a3",
            name: "Admin",
            email: "admin@example.com",
            password: "admin",
            favourites: [],
            isAdmin: true,
          },
          {
            id: "4876",
            name: "Peter",
            email: "peter@mail.com",
            password: "peter",
            favourites: [],
            isAdmin: false,
          },
        ],
      })
    );

    // call the action
    await store.dispatch("fetchUsers");

    // assert that axios.get called with correct url
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/users");

    // assert that the correct mutation was committed
    expect(store.state.users).toEqual([
      {
        id: "c0a3",
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        favourites: [],
        isAdmin: true,
      },
      {
        id: "4876",
        name: "Peter",
        email: "peter@mail.com",
        password: "peter",
        favourites: [],
        isAdmin: false,
      },
    ]);
  });
  it("should delete a restaurant from fav list and remove it from the state", async () => {
    // Arrange
    const newRestaurant = {
      id: "c0a3",
      name: "Admin",
      email: "admin@example.com",
      password: "admin",
      favourites: ["5656"],
      isAdmin: true,
    };
    // set up initial state
    store.state.users = [
      {
        id: "c0a3",
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        favourites: ["5656", "5678"],
        isAdmin: true,
      },
    ];

    // mock the axios call
    axios.put.mockResolvedValue({ data: newRestaurant });

    // Act
    // call the action
    await store.dispatch("removeFavourites", newRestaurant);

    // assert the url
    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3000/users/${newRestaurant.id}`,
      newRestaurant
    );

    // Assert
    expect(store.state.users).toEqual([
      {
        id: "c0a3",
        name: "Admin",
        email: "admin@example.com",
        password: "admin",
        favourites: ["5656"],
        isAdmin: true,
      },
    ]);
  });
});
