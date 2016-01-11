describe('CroppedPhoto', () => {
  it("should call setWrapperDimensions when mounting or updating");

  describe("setWrapperDimensions", () => {
    it("computes the wrapper width/height correctly");
  });

  describe("imageLoaded", () => {
    it("gets the dimenions of the loaded src image");
  });

  describe("imageFailed", () => {
    it("sets the src to the default image");
  });

  describe("getFillDirection", () => {
    describe("crop ratio", () => {
      it("fills height when landscape and cropRatio is present");
      it("fills width when portrait and cropRatio is present");
      it("applies the correct height for provided ratio");
    });

    describe("show full image", () => {
      it("fills width when provided with an image with a smaller ratio than parent");
      it("fills height when provided with an image with a larger ratio than parent");
    });

    describe("fill wrapper", () => {
      it("fills height when provided with an image with a smaller ratio than parent");
      it("fills height when provided with an image with a larger ratio than parent");
    });
  });

  it("should apply bg-black when isDummy is true");
  it("should convert 100vh to innerHeight of window for iOS safari");
  it("should scrub https when origin is non-ssl");
  it("should add https when origin is ssl");
})
