module.exports = {
  extends: ["next", "prettier"],
  root: true,
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};
