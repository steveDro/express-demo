module.exports = (speakerService) => {
  const speakers = async (req, res, next) => {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  };

  return speakers;
};
