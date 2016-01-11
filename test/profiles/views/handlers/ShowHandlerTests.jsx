describe('ShowHandler', () => {
  describe("Profile Detail", () => {
    it("renders nothing if condtion is false")
    it("renders wide heading if heading is present")
  });

  it("fetches viewed profile and photos with uri param profile_id when mounting");
  it("redirects to EditHandler if attempting to view own profile");
  
  it("renders a loading screen when any critical data is missing");

  it("has a header title of `Search`");
  it("has a header accessory `Options` which toggles modal on click");

  it("renders a ProfileShowOptions component");
  it("renders a ProfileSummary");

  it("renders the tagline with a quote icon");

  describe("Basics Section", () => {
    it("renders the zodiak with a calendar icon");
    it("renders height with resize-vertical icon");
    it("renders ethnicity with globe icon");
    it("renders body_type with male icon");
    it("renders hair_colour with hair icon");
    it("renders eye_colour with eye icon");
  });

  it("renders about_me section");
  it("renders seeking section");

  describe("Gifts Section", () => {
    it("renders all gifts for profile");
  });
})
