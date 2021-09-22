const isAnyModalOpenSelector = function (state) {
  return (
    state.modals.addArticle.isOpen ||
    state.modals.removeArticle.isOpen ||
    state.modals.setFeaturedArticles.isOpen
  );
};

export { isAnyModalOpenSelector };
