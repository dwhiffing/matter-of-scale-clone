describe('ProfileShowOptions', () => {
  describe("More Button", () => {
    it("renders `more` and increments the page on click");
  });
  describe("Gift Button", () => {
    it("renders `Send Gift` and links to new_message on click");
  });
  describe("Message Button", () => {
    it("renders `Send message` and links to new_message on click");
  });
  describe("Report Button", () => {
    it("renders `Report Suspicious Profile` and links to report on click");
  });
  describe("Favorite Button", () => {
    it("renders `unfavorite` and unfavorites on click when login is present in favorites");
    it("renders `favorite` and favorites on click when login not is present in favorites");
  });
  describe("Block Button", () => {
    it("renders `unblock` and unblocks on click when login is present in blocks");
    it("renders `block` and blocks on click when login not is present in blocks");
  });
  describe("Flirt Button", () => {
    it("renders `flirted` and no-ops on click when login is present in flirted");
    it("renders `flirt` and sends flirt on click when login is not present in flirted");
  });
  describe("Private Access Button", () => {
    it("renders `granted` and no-ops on click when login present in granters");
    it("renders `requested` and no-ops on click when login present in requested");
    it("renders `request` and requests on click when login not present");
  });
})
