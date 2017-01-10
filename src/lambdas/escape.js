const escape = require('escape-html');

module.exports = {module, lambda};

const unsetTags = `<!--{[{={{ }}=}]}-->`;
const resetTags = `<!--{{={[{ }]}=}}-->`;

function lambda(template) {
  return unsetTags + escape(template).trim() + resetTags;
}
