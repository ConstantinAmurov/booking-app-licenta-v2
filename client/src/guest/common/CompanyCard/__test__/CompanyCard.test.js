import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import CompanyCard from "../CompanyCard";
import { Provider } from "react-redux";
import store from "../../../../common/state/redux/reduxStore";

describe("render company card", () => {
  test("companies renders", () => {
    const companyWithService = {
      serviceID: 123,
      serviceName: "MyService",
      serviceDuration: "20",
      servicePeriods: { byAdmin: [], byGuests: [] },
      serviceSpace: 3,
      serviceTimeStart: "08:00",
      serviceTimeEnd: "22:00",
      servicePrice: "100",
      serviceDescription: "This is my service",
      companyName: "My Company",
      companyDescription: "This is my company",
      companyImageURL:
        "https://booking-app-licenta-v3.herokuapp.com/static/media/helloBro.3bcbf094.png",
      companyID: 12334,
    };

    const { getByTestId } = render(
      <Provider store={store}>
        {" "}
        <CompanyCard companyWithService={companyWithService} />
      </Provider>
    );

    expect(getByTestId("service_name").textContent).toBe(
      companyWithService.serviceName
    );
    expect(getByTestId("service_pric").textContent).toBe(
      companyWithService.servicePrice
    );
    expect(getByTestId("service_desc").textContent).toBe(
      companyWithService.serviceDescription
    );
    expect(getByTestId("company_title").textContent).toBe(
      companyWithService.companyName
    );
  }, 1000);
});
