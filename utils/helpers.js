module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
};

module.exports.encodeURIComponent = (value) => {
    return encodeURIComponent(value)
  }