/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
class El {
  element;

  #currentClasses = [];

  constructor(tag, options = {}) {
    this.element = document.createElement(tag);

    for (const [option, value] of Object.entries(options)) {
      // Classes - string list with " " separator or array
      if (option === "classes") {
        this.classes = value;
      }

      // Parent - css selector or reference to element
      if (option === "parent") {
        this.parent = value;
      }

      // TextContent
      if (option === "text") {
        this.text = value;
      }

      // type
      if (option === "properties") {
        this.properties = value;
      }

      // ID
      if (option === "id") {
        this.id = value;
      }
    }
  }

  // Provide an array of classes or a string separated by spaces to set classes
  set classes(value) {
    if (value !== "") {
      Array.isArray(value)
        ? (this.#currentClasses = value)
        : (this.#currentClasses = value.split(" "));
      this.element.classList.remove(...this.element.classList);
      this.#currentClasses.forEach((className) => {
        this.element.classList.add(className);
      });
    } else {
      // Removes all classes
      this.#currentClasses = [];
      this.element.classList.remove(...this.element.classList);
    }
  }

  get classes() {
    return this.#currentClasses;
  }

  set addClass(value) {
    // Adds single class
    this.element.classList.add(value);
    this.#currentClasses.push(value);
  }

  // Provide a css selector or a node to append to it.
  set parent(parentIdentifier) {
    typeof parentIdentifier === "string"
      ? (this._parent = document.querySelector(parentIdentifier))
      : (this._parent = parentIdentifier);
    this._parent.appendChild(this.element);
  }

  get parent() {
    return this._parent;
  }

  // Changes elements textContent
  set text(textString) {
    this._text = textString;
    this.element.textContent = textString;
  }

  get text() {
    return this._text;
  }

  // Loops over properties in object
  set properties(props) {
    this._properties = props;
    Object.entries(this._properties).forEach(([property, propValue]) => {
      this.element.setAttribute(property, propValue);
    });
  }

  get properties() {
    return this._properties;
  }

  set id(value) {
    this._id = value;
    this.element.id = this._id;
  }

  get id() {
    return this._id;
  }
}
/*
options

parent
classes
text
type - to be renamed properties
*/
export default El;
