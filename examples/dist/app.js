require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsCreatable = require('./components/Creatable');

var _componentsCreatable2 = _interopRequireDefault(_componentsCreatable);

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsGithubUsers = require('./components/GithubUsers');

var _componentsGithubUsers2 = _interopRequireDefault(_componentsGithubUsers);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsBooleanSelect = require('./components/BooleanSelect');

var _componentsBooleanSelect2 = _interopRequireDefault(_componentsBooleanSelect);

var _componentsVirtualized = require('./components/Virtualized');

var _componentsVirtualized2 = _interopRequireDefault(_componentsVirtualized);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsCreatable2['default'], {
		hint: 'Enter a value that\'s NOT in the list, then hit return',
		label: 'Custom tag creation'
	})
), document.getElementById('example'));

},{"./components/BooleanSelect":2,"./components/Contributors":3,"./components/Creatable":4,"./components/CustomComponents":5,"./components/CustomRender":6,"./components/GithubUsers":7,"./components/Multiselect":8,"./components/NumericSelect":9,"./components/States":10,"./components/Virtualized":11,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsBooleansField = (0, _createReactClass2['default'])({
	displayName: 'ValuesAsBooleansField',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
			value: null
		};
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Boolean Select value changed to', value);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple boolean values'
			)
		);
	}
});

module.exports = ValuesAsBooleansField;

},{"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = (0, _createReactClass2['default'])({
	displayName: 'Contributors',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":13,"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CreatableDemo = (0, _createReactClass2['default'])({
	displayName: 'CreatableDemo',
	propTypes: {
		hint: _propTypes2['default'].string,
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			multiValue: [],
			options: [{ value: 'R', label: 'Red' }, { value: 'G', label: 'Green' }, { value: 'B', label: 'Blue' }],
			value: undefined
		};
	},
	handleOnChange: function handleOnChange(value) {
		var multi = this.state.multi;

		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value: value });
		}
	},
	render: function render() {
		var _state = this.state;
		var multi = _state.multi;
		var multiValue = _state.multiValue;
		var options = _state.options;
		var value = _state.value;

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Creatable, {
				multi: multi,
				options: options,
				onChange: this.handleOnChange,
				value: multi ? multiValue : value
			})
		);
	}
});

module.exports = CreatableDemo;

},{"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = (0, _createReactClass2['default'])({
	propTypes: {
		children: _propTypes2['default'].node,
		className: _propTypes2['default'].string,
		isDisabled: _propTypes2['default'].bool,
		isFocused: _propTypes2['default'].bool,
		isSelected: _propTypes2['default'].bool,
		onFocus: _propTypes2['default'].func,
		onSelect: _propTypes2['default'].func,
		option: _propTypes2['default'].object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = (0, _createReactClass2['default'])({
	propTypes: {
		children: _propTypes2['default'].node,
		placeholder: _propTypes2['default'].string,
		value: _propTypes2['default'].object
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = (0, _createReactClass2['default'])({
	propTypes: {
		hint: _propTypes2['default'].string,
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				arrowRenderer: arrowRenderer,
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

function arrowRenderer() {
	return _react2['default'].createElement(
		'span',
		null,
		'+'
	);
}

module.exports = UsersField;

},{"../data/users":15,"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-gravatar":31,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactHighlightWords = require('react-highlight-words');

var _reactHighlightWords2 = _interopRequireDefault(_reactHighlightWords);

var DisabledUpsellOptions = (0, _createReactClass2['default'])({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		if (value) {
			console.log('Support level selected:', value.label);
		}
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(_reactHighlightWords2['default'], {
			searchWords: [this._inputValue],
			textToHighlight: option.label
		});
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var _this = this;

		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onInputChange: function (inputValue) {
					return _this._inputValue = inputValue;
				},
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-highlight-words":32,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var GithubUsers = (0, _createReactClass2['default'])({
	displayName: 'GithubUsers',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			backspaceRemoves: true,
			multi: true
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers: function getUsers(input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return (0, _isomorphicFetch2['default'])('https://api.github.com/search/users?q=' + input).then(function (response) {
			return response.json();
		}).then(function (json) {
			return { options: json.items };
		});
	},
	gotoUser: function gotoUser(value, event) {
		window.open(value.html_url);
	},
	toggleBackspaceRemoves: function toggleBackspaceRemoves() {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	},
	toggleCreatable: function toggleCreatable() {
		this.setState({
			creatable: !this.state.creatable
		});
	},
	render: function render() {
		var AsyncComponent = this.state.creatable ? _reactSelect2['default'].AsyncCreatable : _reactSelect2['default'].Async;

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(AsyncComponent, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoUser, valueKey: 'id', labelKey: 'login', loadOptions: this.getUsers, backspaceRemoves: this.state.backspaceRemoves }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.creatable, onChange: this.toggleCreatable }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Creatable?'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.backspaceRemoves, onChange: this.toggleBackspaceRemoves }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Backspace Removes?'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses fetch.js for showing Async options with Promises'
			)
		);
	}
});

module.exports = GithubUsers;

},{"create-react-class":undefined,"isomorphic-fetch":23,"prop-types":undefined,"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = (0, _createReactClass2['default'])({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
		});
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsNumbersField = (0, _createReactClass2['default'])({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _propTypes2['default'].string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},
	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render: function render() {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],10:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');

var StatesField = (0, _createReactClass2['default'])({
	displayName: 'StatesField',
	propTypes: {
		label: _propTypes2['default'].string,
		searchable: _propTypes2['default'].bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
		};
	},
	switchCountry: function switchCountry(e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox: function toggleCheckbox(e) {
		var newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render: function render() {
		var options = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', autofocus: true, options: options, simpleValue: true, clearable: this.state.clearable, name: 'selected-state', disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
			_react2['default'].createElement(
				'div',
				{ style: { marginTop: 14 } },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: this.focusStateSelect },
					'Focus Select'
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'searchable', checked: this.state.searchable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Searchable'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'disabled', checked: this.state.disabled, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'clearable', checked: this.state.clearable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Clearable'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'AU', value: 'AU', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Australia'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'US', value: 'US', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'United States'
					)
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":14,"create-react-class":undefined,"prop-types":undefined,"react":undefined,"react-select":undefined}],11:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

var DATA = require('../data/cities');

var CitiesField = (0, _createReactClass2['default'])({
	displayName: 'CitiesField',
	getInitialState: function getInitialState() {
		return {};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'Cities (Large Dataset)'
			),
			_react2['default'].createElement(_reactVirtualizedSelect2['default'], { ref: 'citySelect',
				options: options,
				simpleValue: true,
				clearable: true,
				name: 'select-city',
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true,
				labelKey: 'name',
				valueKey: 'name'
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'Uses ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized' },
					'react-virtualized'
				),
				' and ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized-select/' },
					'react-virtualized-select'
				),
				' to display a list of the world\'s 1,000 largest cities.'
			)
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":12,"create-react-class":undefined,"react":undefined,"react-virtualized-select":35}],12:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],13:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],14:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],15:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],16:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],17:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],18:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],19:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":18}],20:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],21:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],22:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],23:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":82}],24:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":16,"crypt":17,"is-buffer":21}],25:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],26:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);



}).call(this,require('_process'))

},{"_process":27}],27:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],28:[function(require,module,exports){
'use strict';
var strictUriEncode = require('strict-uri-encode');
var objectAssign = require('object-assign');

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

},{"object-assign":25,"strict-uri-encode":81}],29:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"performance-now":26}],30:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowCompare
 */

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}

module.exports = shallowCompare;

},{"fbjs/lib/shallowEqual":20}],31:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gravatar = function (_React$Component) {
  _inherits(Gravatar, _React$Component);

  function Gravatar() {
    _classCallCheck(this, Gravatar);

    return _possibleConstructorReturn(this, (Gravatar.__proto__ || Object.getPrototypeOf(Gravatar)).apply(this, arguments));
  }

  _createClass(Gravatar, [{
    key: 'render',
    value: function render() {
      var base = this.props.protocol + 'www.gravatar.com/avatar/';

      var query = _queryString2.default.stringify({
        s: this.props.size,
        r: this.props.rating,
        d: this.props.default
      });

      var retinaQuery = _queryString2.default.stringify({
        s: this.props.size * 2,
        r: this.props.rating,
        d: this.props.default
      });

      // Gravatar service currently trims and lowercases all registered emails
      var formattedEmail = ('' + this.props.email).trim().toLowerCase();

      var hash = void 0;
      if (this.props.md5) {
        hash = this.props.md5;
      } else if (typeof this.props.email === 'string') {
        hash = (0, _md2.default)(formattedEmail, { encoding: "binary" });
      } else {
        console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
        return _react2.default.createElement('script', null);
      }

      var src = '' + base + hash + '?' + query;
      var retinaSrc = '' + base + hash + '?' + retinaQuery;

      var modernBrowser = true; // server-side, we render for modern browsers

      if (typeof window !== 'undefined') {
        // this is not NodeJS
        modernBrowser = 'srcset' in document.createElement('img');
      }

      var className = 'react-gravatar';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      // Clone this.props and then delete Component specific props so we can
      // spread the rest into the img.

      var rest = _objectWithoutProperties(this.props, []);

      delete rest.md5;
      delete rest.email;
      delete rest.protocol;
      delete rest.rating;
      delete rest.size;
      delete rest.style;
      delete rest.className;
      delete rest.default;
      if (!modernBrowser && (0, _isRetina2.default)()) {
        return _react2.default.createElement('img', _extends({
          alt: 'Gravatar for ' + formattedEmail,
          style: this.props.style,
          src: retinaSrc,
          height: this.props.size,
          width: this.props.size
        }, rest, {
          className: className
        }));
      }
      return _react2.default.createElement('img', _extends({
        alt: 'Gravatar for ' + formattedEmail,
        style: this.props.style,
        src: src,
        srcSet: retinaSrc + ' 2x',
        height: this.props.size,
        width: this.props.size
      }, rest, {
        className: className
      }));
    }
  }]);

  return Gravatar;
}(_react2.default.Component);

Gravatar.displayName = 'Gravatar';
Gravatar.propTypes = {
  email: _propTypes2.default.string,
  md5: _propTypes2.default.string,
  size: _propTypes2.default.number,
  rating: _propTypes2.default.string,
  default: _propTypes2.default.string,
  className: _propTypes2.default.string,
  protocol: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Gravatar.defaultProps = {
  size: 50,
  rating: 'g',
  default: 'retro',
  protocol: '//'
};


module.exports = Gravatar;
},{"is-retina":22,"md5":24,"prop-types":undefined,"query-string":28,"react":undefined}],32:[function(require,module,exports){
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Highlighter = __webpack_require__(2);
	
	var _Highlighter2 = _interopRequireDefault(_Highlighter);
	
	var _utils = __webpack_require__(4);
	
	exports['default'] = _Highlighter2['default'];
	exports.combineChunks = _utils.combineChunks;
	exports.fillInChunks = _utils.fillInChunks;
	exports.findAll = _utils.findAll;
	exports.findChunks = _utils.findChunks;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = Highlighter;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsJs = __webpack_require__(4);
	
	var Chunks = _interopRequireWildcard(_utilsJs);
	
	Highlighter.propTypes = {
	  highlightClassName: _react.PropTypes.string,
	  highlightStyle: _react.PropTypes.object,
	  searchWords: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
	  textToHighlight: _react.PropTypes.string.isRequired,
	  sanitize: _react.PropTypes.func
	};
	
	/**
	 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
	 * This function returns an array of strings and <span>s (wrapping highlighted words).
	 */
	
	function Highlighter(_ref) {
	  var _ref$highlightClassName = _ref.highlightClassName;
	  var highlightClassName = _ref$highlightClassName === undefined ? '' : _ref$highlightClassName;
	  var _ref$highlightStyle = _ref.highlightStyle;
	  var highlightStyle = _ref$highlightStyle === undefined ? {} : _ref$highlightStyle;
	  var searchWords = _ref.searchWords;
	  var textToHighlight = _ref.textToHighlight;
	  var sanitize = _ref.sanitize;
	
	  var chunks = Chunks.findAll(textToHighlight, searchWords, sanitize);
	
	  return _react2['default'].createElement(
	    'span',
	    null,
	    chunks.map(function (chunk, index) {
	      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
	
	      if (chunk.highlight) {
	        return _react2['default'].createElement(
	          'mark',
	          {
	            className: highlightClassName,
	            key: index,
	            style: highlightStyle
	          },
	          text
	        );
	      } else {
	        return _react2['default'].createElement(
	          'span',
	          { key: index },
	          text
	        );
	      }
	    })
	  );
	}
	
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
	 * @param searchWords string[]
	 * @param textToSearch string
	 * @return {start:number, end:number, highlight:boolean}[]
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var findAll = function findAll(textToSearch, wordsToFind, sanitize) {
	  return fillInChunks(combineChunks(findChunks(textToSearch, wordsToFind, sanitize)), textToSearch.length);
	};
	
	exports.findAll = findAll;
	/**
	 * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
	 * @param chunks {start:number, end:number}[]
	 * @return {start:number, end:number}[]
	 */
	var combineChunks = function combineChunks(chunks) {
	  chunks = chunks.sort(function (first, second) {
	    return first.start - second.start;
	  }).reduce(function (processedChunks, nextChunk) {
	    // First chunk just goes straight in the array...
	    if (processedChunks.length === 0) {
	      return [nextChunk];
	    } else {
	      // ... subsequent chunks get checked to see if they overlap...
	      var prevChunk = processedChunks.pop();
	      if (nextChunk.start <= prevChunk.end) {
	        // It may be the case that prevChunk completely surrounds nextChunk, so take the
	        // largest of the end indeces.
	        var endIndex = Math.max(prevChunk.end, nextChunk.end);
	        processedChunks.push({ start: prevChunk.start, end: endIndex });
	      } else {
	        processedChunks.push(prevChunk, nextChunk);
	      }
	      return processedChunks;
	    }
	  }, []);
	
	  return chunks;
	};
	
	exports.combineChunks = combineChunks;
	/**
	 * Examine textToSearch for any matches.
	 * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
	 * @param textToSearch string
	 * @param wordsToFind string[]
	 * @param sanitize Process and optionally modify textToSearch and wordsToFind before comparison; this can be used to eg. remove accents
	 * @return {start:number, end:number}[]
	 */
	var findChunks = function findChunks(textToSearch, wordsToFind) {
	  var sanitize = arguments.length <= 2 || arguments[2] === undefined ? identity : arguments[2];
	  return wordsToFind.filter(function (searchWord) {
	    return searchWord;
	  }) // Remove empty words
	  .reduce(function (chunks, searchWord) {
	    var normalizedWord = sanitize(searchWord);
	    var normalizedText = sanitize(textToSearch);
	    var regex = new RegExp(normalizedWord, 'gi');
	    var match = undefined;
	    while ((match = regex.exec(normalizedText)) != null) {
	      chunks.push({ start: match.index, end: regex.lastIndex });
	    }
	    return chunks;
	  }, []);
	};
	
	exports.findChunks = findChunks;
	/**
	 * Given a set of chunks to highlight, create an additional set of chunks
	 * to represent the bits of text between the highlighted text.
	 * @param chunksToHighlight {start:number, end:number}[]
	 * @param totalLength number
	 * @return {start:number, end:number, highlight:boolean}[]
	 */
	var fillInChunks = function fillInChunks(chunksToHighlight, totalLength) {
	  var allChunks = [];
	  var append = function append(start, end, highlight) {
	    if (end - start > 0) {
	      allChunks.push({ start: start, end: end, highlight: highlight });
	    }
	  };
	
	  if (chunksToHighlight.length === 0) {
	    append(0, totalLength, false);
	  } else {
	    (function () {
	      var lastIndex = 0;
	      chunksToHighlight.forEach(function (chunk) {
	        append(lastIndex, chunk.start, false);
	        append(chunk.start, chunk.end, true);
	        lastIndex = chunk.end;
	      });
	      append(lastIndex, totalLength, false);
	    })();
	  }
	  return allChunks;
	};
	
	exports.fillInChunks = fillInChunks;
	function identity(value) {
	  return value;
	}

/***/ }
/******/ ]);

},{"react":undefined}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualizedSelect = function (_Component) {
  _inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    _classCallCheck(this, VirtualizedSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._optionRenderer = _this._optionRenderer.bind(_this);
    return _this;
  }

  /** See VirtualScroll#recomputeRowHeights */


  _createClass(VirtualizedSelect, [{
    key: 'recomputeOptionHeights',
    value: function recomputeOptionHeights() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this._virtualScroll) {
        this._virtualScroll.recomputeRowHeights(index);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var SelectComponent = this._getSelectComponent();

      return _react2.default.createElement(SelectComponent, _extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var _this2 = this;

      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var optionRenderer = this.props.optionRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = this._calculateVirtualScrollHeight({ options: options });
      var innerRowRenderer = optionRenderer || this._optionRenderer;

      function wrappedRowRenderer(_ref2) {
        var index = _ref2.index;

        var option = options[index];

        return innerRowRenderer({
          focusedOption: focusedOption,
          focusedOptionIndex: focusedOptionIndex,
          focusOption: focusOption,
          labelKey: labelKey,
          option: option,
          optionIndex: index,
          options: options,
          selectValue: selectValue,
          valueArray: valueArray
        });
      }

      return _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        { disableHeight: true },
        function (_ref3) {
          var width = _ref3.width;
          return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            ref: function ref(_ref5) {
              return _this2._virtualScroll = _ref5;
            },
            rowCount: options.length,
            rowHeight: function rowHeight(_ref4) {
              var index = _ref4.index;
              return _this2._getOptionHeight({
                option: options[index]
              });
            },
            rowRenderer: wrappedRowRenderer,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_calculateVirtualScrollHeight',
    value: function _calculateVirtualScrollHeight(_ref6) {
      var options = _ref6.options;
      var maxHeight = this.props.maxHeight;


      var height = 0;

      for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
        var option = options[optionIndex];

        height += this._getOptionHeight({ option: option });

        if (height > maxHeight) {
          return maxHeight;
        }
      }

      return height;
    }
  }, {
    key: '_getOptionHeight',
    value: function _getOptionHeight(_ref7) {
      var option = _ref7.option;
      var optionHeight = this.props.optionHeight;


      return optionHeight instanceof Function ? optionHeight({ option: option }) : optionHeight;
    }
  }, {
    key: '_getSelectComponent',
    value: function _getSelectComponent() {
      var _props = this.props;
      var async = _props.async;
      var selectComponent = _props.selectComponent;


      if (selectComponent) {
        return selectComponent;
      } else if (async) {
        return _reactSelect2.default.Async;
      } else {
        return _reactSelect2.default;
      }
    }
  }, {
    key: '_optionRenderer',
    value: function _optionRenderer(_ref8) {
      var focusedOption = _ref8.focusedOption;
      var focusOption = _ref8.focusOption;
      var labelKey = _ref8.labelKey;
      var option = _ref8.option;
      var selectValue = _ref8.selectValue;

      var height = this._getOptionHeight({ option: option });

      var className = ['VirtualizedSelectOption'];

      if (option === focusedOption) {
        className.push('VirtualizedSelectFocusedOption');
      }

      if (option.disabled) {
        className.push('VirtualizedSelectDisabledOption');
      }

      var events = option.disabled ? {} : {
        onClick: function onClick() {
          return selectValue(option);
        },
        onMouseOver: function onMouseOver() {
          return focusOption(option);
        }
      };

      return _react2.default.createElement(
        'div',
        _extends({
          className: className.join(' '),
          style: { height: height }
        }, events),
        option[labelKey]
      );
    }
  }]);

  return VirtualizedSelect;
}(_react.Component);

VirtualizedSelect.propTypes = {
  async: _react.PropTypes.bool,
  maxHeight: _react.PropTypes.number.isRequired,
  optionHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,
  optionRenderer: _react.PropTypes.func,
  selectComponent: _react.PropTypes.func
};
VirtualizedSelect.defaultProps = {
  async: false,
  maxHeight: 200,
  optionHeight: 35
};
exports.default = VirtualizedSelect;
},{"react":undefined,"react-select":undefined,"react-virtualized":77}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _VirtualizedSelect = require('./VirtualizedSelect');

var _VirtualizedSelect2 = _interopRequireDefault(_VirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualizedSelect2.default;
},{"./VirtualizedSelect":33}],35:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"./VirtualizedSelect":34,"dup":34}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */
var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, (ArrowKeyStepper.__proto__ || Object.getPrototypeOf(ArrowKeyStepper)).call(this, props, context));

    _this.state = {
      scrollToColumn: 0,
      scrollToRow: 0
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(ArrowKeyStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var _state = this.state;
      var scrollToColumn = _state.scrollToColumn;
      var scrollToRow = _state.scrollToRow;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onKeyDown: this._onKeyDown
        },
        children({
          onSectionRendered: this._onSectionRendered,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      var _props2 = this.props;
      var columnCount = _props2.columnCount;
      var rowCount = _props2.rowCount;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.min(this._rowStopIndex + 1, rowCount - 1)
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.max(this._columnStartIndex - 1, 0)
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.min(this._columnStopIndex + 1, columnCount - 1)
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.max(this._rowStartIndex - 1, 0)
          });
          break;
      }
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref) {
      var columnStartIndex = _ref.columnStartIndex;
      var columnStopIndex = _ref.columnStopIndex;
      var rowStartIndex = _ref.rowStartIndex;
      var rowStopIndex = _ref.rowStopIndex;

      this._columnStartIndex = columnStartIndex;
      this._columnStopIndex = columnStopIndex;
      this._rowStartIndex = rowStartIndex;
      this._rowStopIndex = rowStopIndex;
    }
  }]);

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnCount: _react.PropTypes.number.isRequired,
  rowCount: _react.PropTypes.number.isRequired
};
exports.default = ArrowKeyStepper;
},{"react":undefined,"react-addons-shallow-compare":30}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowKeyStepper = exports.default = undefined;

var _ArrowKeyStepper2 = require('./ArrowKeyStepper');

var _ArrowKeyStepper3 = _interopRequireDefault(_ArrowKeyStepper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArrowKeyStepper3.default;
exports.ArrowKeyStepper = _ArrowKeyStepper3.default;
},{"./ArrowKeyStepper":36}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator component that automatically adjusts the width and height of a single child.
 * Child component should not be declared as a child but should rather be specified by a `ChildComponent` property.
 * All other properties will be passed through to the child component.
 */
var AutoSizer = function (_Component) {
  _inherits(AutoSizer, _Component);

  function AutoSizer(props) {
    _classCallCheck(this, AutoSizer);

    var _this = _possibleConstructorReturn(this, (AutoSizer.__proto__ || Object.getPrototypeOf(AutoSizer)).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  _createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Delay access of parentNode until mount.
      // This handles edge-cases where the component has already been unmounted before its ref has been set,
      // As well as libraries like react-lite which have a slightly different lifecycle.
      this._parentNode = this._autoSizer.parentNode;

      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = require('../vendor/detectElementResize');
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._detectElementResize) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var disableHeight = _props.disableHeight;
      var disableWidth = _props.disableWidth;
      var _state = this.state;
      var height = _state.height;
      var width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };

      if (!disableHeight) {
        outerStyle.height = 0;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: this._setRef,
          onScroll: this._onScroll,
          style: outerStyle
        },
        children({ height: height, width: width })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var onResize = this.props.onResize;

      // Gaurd against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      var boundingRect = this._parentNode.getBoundingClientRect();
      var height = boundingRect.height || 0;
      var width = boundingRect.width || 0;

      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      var paddingRight = parseInt(style.paddingRight, 10) || 0;
      var paddingTop = parseInt(style.paddingTop, 10) || 0;
      var paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      this.setState({
        height: height - paddingTop - paddingBottom,
        width: width - paddingLeft - paddingRight
      });

      onResize({ height: height, width: width });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // Prevent detectElementResize library from being triggered by this scroll event.
      event.stopPropagation();
    }
  }, {
    key: '_setRef',
    value: function _setRef(autoSizer) {
      this._autoSizer = autoSizer;
    }
  }]);

  return AutoSizer;
}(_react.Component);

AutoSizer.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, width }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Disable dynamic :height property */
  disableHeight: _react.PropTypes.bool,

  /** Disable dynamic :width property */
  disableWidth: _react.PropTypes.bool,

  /** Callback to be invoked on-resize: ({ height, width }) */
  onResize: _react.PropTypes.func.isRequired
};
AutoSizer.defaultProps = {
  onResize: function onResize() {}
};
exports.default = AutoSizer;
},{"../vendor/detectElementResize":80,"react":undefined,"react-addons-shallow-compare":30}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = exports.default = undefined;

var _AutoSizer2 = require('./AutoSizer');

var _AutoSizer3 = _interopRequireDefault(_AutoSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AutoSizer3.default;
exports.AutoSizer = _AutoSizer3.default;
},{"./AutoSizer":38}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _defaultCellSizeCache = require('./defaultCellSizeCache');

var _defaultCellSizeCache2 = _interopRequireDefault(_defaultCellSizeCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Measures a Grid cell's contents by rendering them in a way that is not visible to the user.
 * Either a fixed width or height may be provided if it is desirable to measure only in one direction.
 */
var CellMeasurer = function (_Component) {
  _inherits(CellMeasurer, _Component);

  function CellMeasurer(props, state) {
    _classCallCheck(this, CellMeasurer);

    var _this = _possibleConstructorReturn(this, (CellMeasurer.__proto__ || Object.getPrototypeOf(CellMeasurer)).call(this, props, state));

    _this._cellSizeCache = props.cellSizeCache || new _defaultCellSizeCache2.default();

    _this.getColumnWidth = _this.getColumnWidth.bind(_this);
    _this.getRowHeight = _this.getRowHeight.bind(_this);
    _this.resetMeasurements = _this.resetMeasurements.bind(_this);
    _this.resetMeasurementForColumn = _this.resetMeasurementForColumn.bind(_this);
    _this.resetMeasurementForRow = _this.resetMeasurementForRow.bind(_this);
    return _this;
  }

  _createClass(CellMeasurer, [{
    key: 'getColumnWidth',
    value: function getColumnWidth(_ref) {
      var index = _ref.index;

      if (this._cellSizeCache.hasColumnWidth(index)) {
        return this._cellSizeCache.getColumnWidth(index);
      }

      var rowCount = this.props.rowCount;


      var maxWidth = 0;

      for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        var _measureCell2 = this._measureCell({
          clientWidth: true,
          columnIndex: index,
          rowIndex: rowIndex
        });

        var width = _measureCell2.width;


        maxWidth = Math.max(maxWidth, width);
      }

      this._cellSizeCache.setColumnWidth(index, maxWidth);

      return maxWidth;
    }
  }, {
    key: 'getRowHeight',
    value: function getRowHeight(_ref2) {
      var index = _ref2.index;

      if (this._cellSizeCache.hasRowHeight(index)) {
        return this._cellSizeCache.getRowHeight(index);
      }

      var columnCount = this.props.columnCount;


      var maxHeight = 0;

      for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        var _measureCell3 = this._measureCell({
          clientHeight: true,
          columnIndex: columnIndex,
          rowIndex: index
        });

        var height = _measureCell3.height;


        maxHeight = Math.max(maxHeight, height);
      }

      this._cellSizeCache.setRowHeight(index, maxHeight);

      return maxHeight;
    }
  }, {
    key: 'resetMeasurementForColumn',
    value: function resetMeasurementForColumn(columnIndex) {
      this._cellSizeCache.clearColumnWidth(columnIndex);
    }
  }, {
    key: 'resetMeasurementForRow',
    value: function resetMeasurementForRow(rowIndex) {
      this._cellSizeCache.clearRowHeight(rowIndex);
    }
  }, {
    key: 'resetMeasurements',
    value: function resetMeasurements() {
      this._cellSizeCache.clearAllColumnWidths();
      this._cellSizeCache.clearAllRowHeights();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._renderAndMount();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var cellSizeCache = this.props.cellSizeCache;


      if (cellSizeCache !== nextProps.cellSizeCache) {
        this._cellSizeCache = nextProps.cellSizeCache;
      }

      this._updateDivDimensions(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unmountContainer();
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        getColumnWidth: this.getColumnWidth,
        getRowHeight: this.getRowHeight,
        resetMeasurements: this.resetMeasurements,
        resetMeasurementForColumn: this.resetMeasurementForColumn,
        resetMeasurementForRow: this.resetMeasurementForRow
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_getContainerNode',
    value: function _getContainerNode(props) {
      var container = props.container;


      if (container) {
        return _reactDom2.default.findDOMNode(typeof container === 'function' ? container() : container);
      } else {
        return document.body;
      }
    }
  }, {
    key: '_measureCell',
    value: function _measureCell(_ref3) {
      var _ref3$clientHeight = _ref3.clientHeight;
      var clientHeight = _ref3$clientHeight === undefined ? false : _ref3$clientHeight;
      var _ref3$clientWidth = _ref3.clientWidth;
      var clientWidth = _ref3$clientWidth === undefined ? true : _ref3$clientWidth;
      var columnIndex = _ref3.columnIndex;
      var rowIndex = _ref3.rowIndex;
      var cellRenderer = this.props.cellRenderer;


      var rendered = cellRenderer({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });

      // Handle edge case where this method is called before the CellMeasurer has completed its initial render (and mounted).
      this._renderAndMount();

      // @TODO Keep an eye on this for future React updates as the interface may change:
      // https://twitter.com/soprano/status/737316379712331776
      _reactDom2.default.unstable_renderSubtreeIntoContainer(this, rendered, this._div);

      var measurements = {
        height: clientHeight && this._div.clientHeight,
        width: clientWidth && this._div.clientWidth
      };

      _reactDom2.default.unmountComponentAtNode(this._div);

      return measurements;
    }
  }, {
    key: '_renderAndMount',
    value: function _renderAndMount() {
      if (!this._div) {
        this._div = document.createElement('div');
        this._div.style.display = 'inline-block';
        this._div.style.position = 'absolute';
        this._div.style.visibility = 'hidden';
        this._div.style.zIndex = -1;

        this._updateDivDimensions(this.props);

        this._containerNode = this._getContainerNode(this.props);
        this._containerNode.appendChild(this._div);
      }
    }
  }, {
    key: '_unmountContainer',
    value: function _unmountContainer() {
      if (this._div) {
        this._containerNode.removeChild(this._div);

        this._div = null;
      }

      this._containerNode = null;
    }
  }, {
    key: '_updateDivDimensions',
    value: function _updateDivDimensions(props) {
      var height = props.height;
      var width = props.width;


      if (height && height !== this._divHeight) {
        this._divHeight = height;
        this._div.style.height = height + 'px';
      }

      if (width && width !== this._divWidth) {
        this._divWidth = width;
        this._div.style.width = width + 'px';
      }
    }
  }]);

  return CellMeasurer;
}(_react.Component);

CellMeasurer.propTypes = {
  /**
   * Renders a cell given its indices.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Optional, custom caching strategy for cell sizes.
   */
  cellSizeCache: _react.PropTypes.object,

  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ getColumnWidth, getRowHeight, resetMeasurements }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Number of columns in grid.
   */
  columnCount: _react.PropTypes.number.isRequired,

  /**
   * A Node, Component instance, or function that returns either.
   * If this property is not specified the document body will be used.
   */
  container: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.node]),

  /**
   * Assign a fixed :height in order to measure dynamic text :width only.
   */
  height: _react.PropTypes.number,

  /**
   * Number of rows in grid.
   */
  rowCount: _react.PropTypes.number.isRequired,

  /**
   * Assign a fixed :width in order to measure dynamic text :height only.
   */
  width: _react.PropTypes.number
};
exports.default = CellMeasurer;
},{"./defaultCellSizeCache":41,"react":undefined,"react-addons-shallow-compare":30,"react-dom":undefined}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default CellMeasurer `cellSizeCache` implementation.
 * Permanently caches all cell sizes (identified by column and row index) unless explicitly cleared.
 * Can be configured to handle uniform cell widths and/or heights as a way of optimizing certain use cases.
 */
var CellSizeCache = function () {
  function CellSizeCache() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$uniformRowHeight = _ref.uniformRowHeight;
    var uniformRowHeight = _ref$uniformRowHeight === undefined ? false : _ref$uniformRowHeight;
    var _ref$uniformColumnWid = _ref.uniformColumnWidth;
    var uniformColumnWidth = _ref$uniformColumnWid === undefined ? false : _ref$uniformColumnWid;

    _classCallCheck(this, CellSizeCache);

    this._uniformRowHeight = uniformRowHeight;
    this._uniformColumnWidth = uniformColumnWidth;

    this._cachedColumnWidths = {};
    this._cachedRowHeights = {};
  }

  _createClass(CellSizeCache, [{
    key: "clearAllColumnWidths",
    value: function clearAllColumnWidths() {
      this._cachedColumnWidth = undefined;
      this._cachedColumnWidths = {};
    }
  }, {
    key: "clearAllRowHeights",
    value: function clearAllRowHeights() {
      this._cachedRowHeight = undefined;
      this._cachedRowHeights = {};
    }
  }, {
    key: "clearColumnWidth",
    value: function clearColumnWidth(index) {
      this._cachedColumnWidth = undefined;

      delete this._cachedColumnWidths[index];
    }
  }, {
    key: "clearRowHeight",
    value: function clearRowHeight(index) {
      this._cachedRowHeight = undefined;

      delete this._cachedRowHeights[index];
    }
  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(index) {
      return this._uniformColumnWidth ? this._cachedColumnWidth : this._cachedColumnWidths[index];
    }
  }, {
    key: "getRowHeight",
    value: function getRowHeight(index) {
      return this._uniformRowHeight ? this._cachedRowHeight : this._cachedRowHeights[index];
    }
  }, {
    key: "hasColumnWidth",
    value: function hasColumnWidth(index) {
      return this._uniformColumnWidth ? !!this._cachedColumnWidth : !!this._cachedColumnWidths[index];
    }
  }, {
    key: "hasRowHeight",
    value: function hasRowHeight(index) {
      return this._uniformRowHeight ? !!this._cachedRowHeight : !!this._cachedRowHeights[index];
    }
  }, {
    key: "setColumnWidth",
    value: function setColumnWidth(index, width) {
      this._cachedColumnWidth = width;
      this._cachedColumnWidths[index] = width;
    }
  }, {
    key: "setRowHeight",
    value: function setRowHeight(index, height) {
      this._cachedRowHeight = height;
      this._cachedRowHeights[index] = height;
    }
  }]);

  return CellSizeCache;
}();

exports.default = CellSizeCache;
},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellSizeCache = exports.CellMeasurer = exports.default = undefined;

var _CellMeasurer2 = require('./CellMeasurer');

var _CellMeasurer3 = _interopRequireDefault(_CellMeasurer2);

var _defaultCellSizeCache2 = require('./defaultCellSizeCache');

var _defaultCellSizeCache3 = _interopRequireDefault(_defaultCellSizeCache2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CellMeasurer3.default;
exports.CellMeasurer = _CellMeasurer3.default;
exports.defaultCellSizeCache = _defaultCellSizeCache3.default;
},{"./CellMeasurer":40,"./defaultCellSizeCache":41}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CollectionView = require('./CollectionView');

var _CollectionView2 = _interopRequireDefault(_CollectionView);

var _calculateSizeAndPositionData2 = require('./utils/calculateSizeAndPositionData');

var _calculateSizeAndPositionData3 = _interopRequireDefault(_calculateSizeAndPositionData2);

var _getUpdatedOffsetForIndex = require('../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders scattered or non-linear data.
 * Unlike Grid, which renders checkerboard data, Collection can render arbitrarily positioned- even overlapping- data.
 */
var Collection = function (_Component) {
  _inherits(Collection, _Component);

  function Collection(props, context) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, props, context));

    _this._cellMetadata = [];
    _this._lastRenderedCellIndices = [];

    // Cell cache during scroll (for perforamnce)
    _this._cellCache = [];

    _this._isScrollingChange = _this._isScrollingChange.bind(_this);
    return _this;
  }

  /** See Collection#recomputeCellSizesAndPositions */


  _createClass(Collection, [{
    key: 'recomputeCellSizesAndPositions',
    value: function recomputeCellSizesAndPositions() {
      this._cellCache = [];
      this._collectionView.recomputeCellSizesAndPositions();
    }

    /** React lifecycle methods */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement(_CollectionView2.default, _extends({
        cellLayoutManager: this,
        isScrollingChange: this._isScrollingChange,
        ref: function ref(_ref) {
          _this2._collectionView = _ref;
        }
      }, props));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** CellLayoutManager interface */

  }, {
    key: 'calculateSizeAndPositionData',
    value: function calculateSizeAndPositionData() {
      var _props = this.props;
      var cellCount = _props.cellCount;
      var cellSizeAndPositionGetter = _props.cellSizeAndPositionGetter;
      var sectionSize = _props.sectionSize;


      var data = (0, _calculateSizeAndPositionData3.default)({
        cellCount: cellCount,
        cellSizeAndPositionGetter: cellSizeAndPositionGetter,
        sectionSize: sectionSize
      });

      this._cellMetadata = data.cellMetadata;
      this._sectionManager = data.sectionManager;
      this._height = data.height;
      this._width = data.width;
    }

    /**
     * Returns the most recently rendered set of cell indices.
     */

  }, {
    key: 'getLastRenderedIndices',
    value: function getLastRenderedIndices() {
      return this._lastRenderedCellIndices;
    }

    /**
     * Calculates the minimum amount of change from the current scroll position to ensure the specified cell is (fully) visible.
     */

  }, {
    key: 'getScrollPositionForCell',
    value: function getScrollPositionForCell(_ref2) {
      var align = _ref2.align;
      var cellIndex = _ref2.cellIndex;
      var height = _ref2.height;
      var scrollLeft = _ref2.scrollLeft;
      var scrollTop = _ref2.scrollTop;
      var width = _ref2.width;
      var cellCount = this.props.cellCount;


      if (cellIndex >= 0 && cellIndex < cellCount) {
        var cellMetadata = this._cellMetadata[cellIndex];

        scrollLeft = (0, _getUpdatedOffsetForIndex2.default)({
          align: align,
          cellOffset: cellMetadata.x,
          cellSize: cellMetadata.width,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: cellIndex
        });

        scrollTop = (0, _getUpdatedOffsetForIndex2.default)({
          align: align,
          cellOffset: cellMetadata.y,
          cellSize: cellMetadata.height,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: cellIndex
        });
      }

      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }
  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return {
        height: this._height,
        width: this._width
      };
    }
  }, {
    key: 'cellRenderers',
    value: function cellRenderers(_ref3) {
      var _this3 = this;

      var height = _ref3.height;
      var isScrolling = _ref3.isScrolling;
      var width = _ref3.width;
      var x = _ref3.x;
      var y = _ref3.y;
      var _props2 = this.props;
      var cellGroupRenderer = _props2.cellGroupRenderer;
      var cellRenderer = _props2.cellRenderer;

      // Store for later calls to getLastRenderedIndices()

      this._lastRenderedCellIndices = this._sectionManager.getCellIndices({
        height: height,
        width: width,
        x: x,
        y: y
      });

      return cellGroupRenderer({
        cellCache: this._cellCache,
        cellRenderer: cellRenderer,
        cellSizeAndPositionGetter: function cellSizeAndPositionGetter(_ref4) {
          var index = _ref4.index;
          return _this3._sectionManager.getCellMetadata({ index: index });
        },
        indices: this._lastRenderedCellIndices,
        isScrolling: isScrolling
      });
    }
  }, {
    key: '_isScrollingChange',
    value: function _isScrollingChange(isScrolling) {
      if (!isScrolling) {
        this._cellCache = [];
      }
    }
  }]);

  return Collection;
}(_react.Component);

Collection.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Number of cells in Collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a group of cells given their indices.
   * Should implement the following interface: ({
   *   cellSizeAndPositionGetter:Function,
   *   indices: Array<number>,
   *   cellRenderer: Function
   * }): Array<PropTypes.node>
   */
  cellGroupRenderer: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ index: number }): PropTypes.element
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback responsible for returning size and offset/position information for a given cell (index).
   * ({ index: number }): { height: number, width: number, x: number, y: number }
   */
  cellSizeAndPositionGetter: _react.PropTypes.func.isRequired,

  /**
   * Optionally override the size of the sections a Collection's cells are split into.
   */
  sectionSize: _react.PropTypes.number
};
Collection.defaultProps = {
  'aria-label': 'grid',
  cellGroupRenderer: defaultCellGroupRenderer
};
exports.default = Collection;


function defaultCellGroupRenderer(_ref5) {
  var cellCache = _ref5.cellCache;
  var cellRenderer = _ref5.cellRenderer;
  var cellSizeAndPositionGetter = _ref5.cellSizeAndPositionGetter;
  var indices = _ref5.indices;
  var isScrolling = _ref5.isScrolling;

  return indices.map(function (index) {
    var cellMetadata = cellSizeAndPositionGetter({ index: index });

    // Avoid re-creating cells while scrolling.
    // This can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
    // If a scroll is in progress- cache and reuse cells.
    // This cache will be thrown away once scrolling complets.
    var renderedCell = void 0;

    if (isScrolling) {
      if (!(index in cellCache)) {
        cellCache[index] = cellRenderer({
          index: index,
          isScrolling: isScrolling
        });
      }

      renderedCell = cellCache[index];
    } else {
      renderedCell = cellRenderer({
        index: index,
        isScrolling: isScrolling
      });
    }

    if (renderedCell == null || renderedCell === false) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      {
        className: 'Collection__cell',
        key: index,
        style: {
          height: cellMetadata.height,
          left: cellMetadata.x,
          top: cellMetadata.y,
          width: cellMetadata.width
        }
      },
      renderedCell
    );
  }).filter(function (renderedCell) {
    return !!renderedCell;
  });
}
},{"../utils/getUpdatedOffsetForIndex":79,"./CollectionView":44,"./utils/calculateSizeAndPositionData":48,"react":undefined,"react-addons-shallow-compare":30}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @TODO It would be nice to refactor Grid to use this code as well.

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Monitors changes in properties (eg. cellCount) and state (eg. scroll offsets) to determine when rendering needs to occur.
 * This component does not render any visible content itself; it defers to the specified :cellLayoutManager.
 */

var CollectionView = function (_Component) {
  _inherits(CollectionView, _Component);

  function CollectionView(props, context) {
    _classCallCheck(this, CollectionView);

    var _this = _possibleConstructorReturn(this, (CollectionView.__proto__ || Object.getPrototypeOf(CollectionView)).call(this, props, context));

    _this.state = {
      calculateSizeAndPositionDataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes callbacks only when their values have changed.
    _this._onSectionRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around.
    _this._invokeOnSectionRenderedHelper = _this._invokeOnSectionRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollPositionForScrollToCell = _this._updateScrollPositionForScrollToCell.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of cell sizes and positions.
   * This function should be called if cell sizes have changed but nothing else has.
   * Since cell positions are calculated by callbacks, the collection view has no way of detecting when the underlying data has changed.
   */


  _createClass(CollectionView, [{
    key: 'recomputeCellSizesAndPositions',
    value: function recomputeCellSizesAndPositions() {
      this.setState({
        calculateSizeAndPositionDataOnNextUpdate: true
      });
    }

    /* ---------------------------- Component lifecycle methods ---------------------------- */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var cellLayoutManager = _props.cellLayoutManager;
      var scrollLeft = _props.scrollLeft;
      var scrollToCell = _props.scrollToCell;
      var scrollTop = _props.scrollTop;

      // If this component was first rendered server-side, scrollbar size will be undefined.
      // In that event we need to remeasure.

      if (!this._scrollbarSizeMeasured) {
        this._scrollbarSize = (0, _scrollbarSize2.default)();
        this._scrollbarSizeMeasured = true;
        this.setState({});
      }

      if (scrollToCell >= 0) {
        this._updateScrollPositionForScrollToCell();
      } else if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      // Update onSectionRendered callback.
      this._invokeOnSectionRenderedHelper();

      var _cellLayoutManager$ge = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge.height;
      var totalWidth = _cellLayoutManager$ge.width;

      // Initialize onScroll callback.

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalHeight: totalHeight,
        totalWidth: totalWidth
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var height = _props2.height;
      var scrollToCell = _props2.scrollToCell;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollToAlignment = _state.scrollToAlignment;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this._scrollingContainer.scrollLeft) {
          this._scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this._scrollingContainer.scrollTop) {
          this._scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToCell values requires it
      if (height !== prevProps.height || scrollToAlignment !== prevProps.scrollToAlignment || scrollToCell !== prevProps.scrollToCell || width !== prevProps.width) {
        this._updateScrollPositionForScrollToCell();
      }

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnSectionRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var cellLayoutManager = this.props.cellLayoutManager;


      cellLayoutManager.calculateSizeAndPositionData();

      // If this component is being rendered server-side, getScrollbarSize() will return undefined.
      // We handle this case in componentDidMount()
      this._scrollbarSize = (0, _scrollbarSize2.default)();
      if (this._scrollbarSize === undefined) {
        this._scrollbarSizeMeasured = false;
        this._scrollbarSize = 0;
      } else {
        this._scrollbarSizeMeasured = true;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.cellCount === 0 && (nextState.scrollLeft !== 0 || nextState.scrollTop !== 0)) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      if (nextProps.cellCount !== this.props.cellCount || nextProps.cellLayoutManager !== this.props.cellLayoutManager || nextState.calculateSizeAndPositionDataOnNextUpdate) {
        nextProps.cellLayoutManager.calculateSizeAndPositionData();
      }

      if (nextState.calculateSizeAndPositionDataOnNextUpdate) {
        this.setState({
          calculateSizeAndPositionDataOnNextUpdate: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var autoHeight = _props3.autoHeight;
      var cellCount = _props3.cellCount;
      var cellLayoutManager = _props3.cellLayoutManager;
      var className = _props3.className;
      var height = _props3.height;
      var horizontalOverscanSize = _props3.horizontalOverscanSize;
      var noContentRenderer = _props3.noContentRenderer;
      var style = _props3.style;
      var verticalOverscanSize = _props3.verticalOverscanSize;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;

      var _cellLayoutManager$ge2 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge2.height;
      var totalWidth = _cellLayoutManager$ge2.width;

      // Safely expand the rendered area by the specified overscan amount

      var left = Math.max(0, scrollLeft - horizontalOverscanSize);
      var top = Math.max(0, scrollTop - verticalOverscanSize);
      var right = Math.min(totalWidth, scrollLeft + width + horizontalOverscanSize);
      var bottom = Math.min(totalHeight, scrollTop + height + verticalOverscanSize);

      var childrenToDisplay = height > 0 && width > 0 ? cellLayoutManager.cellRenderers({
        height: bottom - top,
        isScrolling: isScrolling,
        width: right - left,
        x: left,
        y: top
      }) : [];

      var collectionStyle = {
        height: autoHeight ? 'auto' : height,
        width: width
      };

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      var verticalScrollBarSize = totalHeight > height ? this._scrollbarSize : 0;
      var horizontalScrollBarSize = totalWidth > width ? this._scrollbarSize : 0;
      if (totalWidth + verticalScrollBarSize <= width) {
        collectionStyle.overflowX = 'hidden';
      }
      if (totalHeight + horizontalScrollBarSize <= height) {
        collectionStyle.overflowY = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref) {
            _this2._scrollingContainer = _ref;
          },
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Collection', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: _extends({}, collectionStyle, style),
          tabIndex: 0
        },
        cellCount > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Collection__innerScrollContainer',
            style: {
              height: totalHeight,
              maxHeight: totalHeight,
              maxWidth: totalWidth,
              pointerEvents: isScrolling ? 'none' : '',
              width: totalWidth
            }
          },
          childrenToDisplay
        ),
        cellCount === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Collection.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this3 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        var isScrollingChange = _this3.props.isScrollingChange;


        isScrollingChange(false);

        _this3._disablePointerEventsTimeoutId = null;
        _this3.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_invokeOnSectionRenderedHelper',
    value: function _invokeOnSectionRenderedHelper() {
      var _props4 = this.props;
      var cellLayoutManager = _props4.cellLayoutManager;
      var onSectionRendered = _props4.onSectionRendered;


      this._onSectionRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          indices: cellLayoutManager.getLastRenderedIndices()
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref2) {
      var _this4 = this;

      var scrollLeft = _ref2.scrollLeft;
      var scrollTop = _ref2.scrollTop;
      var totalHeight = _ref2.totalHeight;
      var totalWidth = _ref2.totalWidth;

      this._onScrollMemoizer({
        callback: function callback(_ref3) {
          var scrollLeft = _ref3.scrollLeft;
          var scrollTop = _ref3.scrollTop;
          var _props5 = _this4.props;
          var height = _props5.height;
          var onScroll = _props5.onScroll;
          var width = _props5.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this5 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this5._setNextStateAnimationFrameId = null;
        _this5.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref4) {
      var scrollLeft = _ref4.scrollLeft;
      var scrollTop = _ref4.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollPositionForScrollToCell',
    value: function _updateScrollPositionForScrollToCell() {
      var _props6 = this.props;
      var cellLayoutManager = _props6.cellLayoutManager;
      var height = _props6.height;
      var scrollToAlignment = _props6.scrollToAlignment;
      var scrollToCell = _props6.scrollToCell;
      var width = _props6.width;
      var _state3 = this.state;
      var scrollLeft = _state3.scrollLeft;
      var scrollTop = _state3.scrollTop;


      if (scrollToCell >= 0) {
        var scrollPosition = cellLayoutManager.getScrollPositionForCell({
          align: scrollToAlignment,
          cellIndex: scrollToCell,
          height: height,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          width: width
        });

        if (scrollPosition.scrollLeft !== scrollLeft || scrollPosition.scrollTop !== scrollTop) {
          this._setScrollPosition(scrollPosition);
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this._scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props7 = this.props;
      var cellLayoutManager = _props7.cellLayoutManager;
      var height = _props7.height;
      var isScrollingChange = _props7.isScrollingChange;
      var width = _props7.width;

      var scrollbarSize = this._scrollbarSize;

      var _cellLayoutManager$ge3 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge3.height;
      var totalWidth = _cellLayoutManager$ge3.width;

      var scrollLeft = Math.max(0, Math.min(totalWidth - width + scrollbarSize, event.target.scrollLeft));
      var scrollTop = Math.max(0, Math.min(totalHeight - height + scrollbarSize, event.target.scrollTop));

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        // Synchronously set :isScrolling the first time (since _setNextState will reschedule its animation frame each time it's called)
        if (!this.state.isScrolling) {
          isScrollingChange(true);

          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        totalWidth: totalWidth,
        totalHeight: totalHeight
      });
    }
  }]);

  return CollectionView;
}(_react.Component);

CollectionView.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight: _react.PropTypes.bool,

  /**
   * Number of cells in collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Calculates cell sizes and positions and manages rendering the appropriate cells given a specified window.
   */
  cellLayoutManager: _react.PropTypes.object.isRequired,

  /**
   * Optional custom CSS class name to attach to root Collection element.
   */
  className: _react.PropTypes.string,

  /**
   * Height of Collection; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Enables the `Collection` to horiontally "overscan" its content similar to how `Grid` does.
   * This can reduce flicker around the edges when a user scrolls quickly.
   */
  horizontalOverscanSize: _react.PropTypes.number.isRequired,

  isScrollingChange: _react.PropTypes.func,

  /**
   * Optional renderer to be used in place of rows when either :rowCount or :cellCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Collection that was just rendered.
   * This callback is passed a named :indices parameter which is an Array of the most recently rendered section indices.
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Horizontal offset.
   */
  scrollLeft: _react.PropTypes.number,

  /**
   * Controls scroll-to-cell behavior of the Grid.
   * The default ("auto") scrolls the least amount possible to ensure that the specified cell is fully visible.
   * Use "start" to align cells to the top/left of the Grid and "end" to align bottom/right.
   */
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /**
   * Cell index to ensure visible (by forcefully scrolling if necessary).
   */
  scrollToCell: _react.PropTypes.number,

  /**
   * Vertical offset.
   */
  scrollTop: _react.PropTypes.number,

  /**
   * Optional custom inline style to attach to root Collection element.
   */
  style: _react.PropTypes.object,

  /**
   * Enables the `Collection` to vertically "overscan" its content similar to how `Grid` does.
   * This can reduce flicker around the edges when a user scrolls quickly.
   */
  verticalOverscanSize: _react.PropTypes.number.isRequired,

  /**
   * Width of Collection; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
CollectionView.defaultProps = {
  'aria-label': 'grid',
  horizontalOverscanSize: 0,
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  scrollToAlignment: 'auto',
  style: {},
  verticalOverscanSize: 0
};
exports.default = CollectionView;
},{"../utils/createCallbackMemoizer":78,"classnames":undefined,"dom-helpers/util/scrollbarSize":19,"raf":29,"react":undefined,"react-addons-shallow-compare":30}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A section of the Window.
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * Sections have a fixed size and contain 0 to many cells (tracked by their indices).
 */
var Section = function () {
  function Section(_ref) {
    var height = _ref.height;
    var width = _ref.width;
    var x = _ref.x;
    var y = _ref.y;

    _classCallCheck(this, Section);

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this._indexMap = {};
    this._indices = [];
  }

  /** Add a cell to this section. */


  _createClass(Section, [{
    key: 'addCellIndex',
    value: function addCellIndex(_ref2) {
      var index = _ref2.index;

      if (!this._indexMap[index]) {
        this._indexMap[index] = true;
        this._indices.push(index);
      }
    }

    /** Get all cell indices that have been added to this section. */

  }, {
    key: 'getCellIndices',
    value: function getCellIndices() {
      return this._indices;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      return this.x + ',' + this.y + ' ' + this.width + 'x' + this.height;
    }
  }]);

  return Section;
}(); /** @rlow */


exports.default = Section;
},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Window Sections are used to group nearby cells.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This enables us to more quickly determine which cells to display in a given region of the Window.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Section = require('./Section');

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECTION_SIZE = 100;

/**
 * Contains 0 to many Sections.
 * Grows (and adds Sections) dynamically as cells are registered.
 * Automatically adds cells to the appropriate Section(s).
 */
var SectionManager = function () {
  function SectionManager() {
    var sectionSize = arguments.length <= 0 || arguments[0] === undefined ? SECTION_SIZE : arguments[0];

    _classCallCheck(this, SectionManager);

    this._sectionSize = sectionSize;

    this._cellMetadata = [];
    this._sections = {};
  }

  /**
   * Gets all cell indices contained in the specified region.
   * A region may encompass 1 or more Sections.
   */


  _createClass(SectionManager, [{
    key: 'getCellIndices',
    value: function getCellIndices(_ref) {
      var height = _ref.height;
      var width = _ref.width;
      var x = _ref.x;
      var y = _ref.y;

      var indices = {};

      this.getSections({ height: height, width: width, x: x, y: y }).forEach(function (section) {
        return section.getCellIndices().forEach(function (index) {
          indices[index] = index;
        });
      });

      // Object keys are strings; this function returns numbers
      return Object.keys(indices).map(function (index) {
        return indices[index];
      });
    }

    /** Get size and position information for the cell specified. */

  }, {
    key: 'getCellMetadata',
    value: function getCellMetadata(_ref2) {
      var index = _ref2.index;

      return this._cellMetadata[index];
    }

    /** Get all Sections overlapping the specified region. */

  }, {
    key: 'getSections',
    value: function getSections(_ref3) {
      var height = _ref3.height;
      var width = _ref3.width;
      var x = _ref3.x;
      var y = _ref3.y;

      var sectionXStart = Math.floor(x / this._sectionSize);
      var sectionXStop = Math.floor((x + width - 1) / this._sectionSize);
      var sectionYStart = Math.floor(y / this._sectionSize);
      var sectionYStop = Math.floor((y + height - 1) / this._sectionSize);

      var sections = [];

      for (var sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
        for (var sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
          var key = sectionX + '.' + sectionY;

          if (!this._sections[key]) {
            this._sections[key] = new _Section2.default({
              height: this._sectionSize,
              width: this._sectionSize,
              x: sectionX * this._sectionSize,
              y: sectionY * this._sectionSize
            });
          }

          sections.push(this._sections[key]);
        }
      }

      return sections;
    }

    /** Total number of Sections based on the currently registered cells. */

  }, {
    key: 'getTotalSectionCount',
    value: function getTotalSectionCount() {
      return Object.keys(this._sections).length;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return Object.keys(this._sections).map(function (index) {
        return _this._sections[index].toString();
      });
    }

    /** Adds a cell to the appropriate Sections and registers it metadata for later retrievable. */

  }, {
    key: 'registerCell',
    value: function registerCell(_ref4) {
      var cellMetadatum = _ref4.cellMetadatum;
      var index = _ref4.index;

      this._cellMetadata[index] = cellMetadatum;

      this.getSections(cellMetadatum).forEach(function (section) {
        return section.addCellIndex({ index: index });
      });
    }
  }]);

  return SectionManager;
}();

exports.default = SectionManager;
},{"./Section":45}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = exports.default = undefined;

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Collection3.default;
exports.Collection = _Collection3.default;
},{"./Collection":43}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionData;

var _SectionManager = require('../SectionManager');

var _SectionManager2 = _interopRequireDefault(_SectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateSizeAndPositionData(_ref) {
  var cellCount = _ref.cellCount;
  var cellSizeAndPositionGetter = _ref.cellSizeAndPositionGetter;
  var sectionSize = _ref.sectionSize;

  var cellMetadata = [];
  var sectionManager = new _SectionManager2.default(sectionSize);
  var height = 0;
  var width = 0;

  for (var index = 0; index < cellCount; index++) {
    var cellMetadatum = cellSizeAndPositionGetter({ index: index });

    if (cellMetadatum.height == null || isNaN(cellMetadatum.height) || cellMetadatum.width == null || isNaN(cellMetadatum.width) || cellMetadatum.x == null || isNaN(cellMetadatum.x) || cellMetadatum.y == null || isNaN(cellMetadatum.y)) {
      throw Error('Invalid metadata returned for cell ' + index + ':\n        x:' + cellMetadatum.x + ', y:' + cellMetadatum.y + ', width:' + cellMetadatum.width + ', height:' + cellMetadatum.height);
    }

    height = Math.max(height, cellMetadatum.y + cellMetadatum.height);
    width = Math.max(width, cellMetadatum.x + cellMetadatum.width);

    cellMetadata[index] = cellMetadatum;
    sectionManager.registerCell({
      cellMetadatum: cellMetadatum,
      index: index
    });
  }

  return {
    cellMetadata: cellMetadata,
    height: height,
    sectionManager: sectionManager,
    width: width
  };
}
},{"../SectionManager":46}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */
var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, (ColumnSizer.__proto__ || Object.getPrototypeOf(ColumnSizer)).call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(ColumnSizer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var columnMaxWidth = _props.columnMaxWidth;
      var columnMinWidth = _props.columnMinWidth;
      var columnCount = _props.columnCount;
      var width = _props.width;


      if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnCount !== prevProps.columnCount || width !== prevProps.width) {
        if (this._registeredChild) {
          this._registeredChild.recomputeGridSize();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var columnMaxWidth = _props2.columnMaxWidth;
      var columnMinWidth = _props2.columnMinWidth;
      var columnCount = _props2.columnCount;
      var width = _props2.width;


      var safeColumnMinWidth = columnMinWidth || 1;

      var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

      var columnWidth = width / columnCount;
      columnWidth = Math.max(safeColumnMinWidth, columnWidth);
      columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
      columnWidth = Math.floor(columnWidth);

      var adjustedWidth = Math.min(width, columnWidth * columnCount);

      return children({
        adjustedWidth: adjustedWidth,
        getColumnWidth: function getColumnWidth() {
          return columnWidth;
        },
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(child) {
      if (child !== null && !(child instanceof _Grid2.default)) {
        throw Error('Unexpected child type registered; only Grid children are supported.');
      }

      this._registeredChild = child;

      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  }]);

  return ColumnSizer;
}(_react.Component);

ColumnSizer.propTypes = {
  /**
   * Function respondible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or FlexTable child */
  columnCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or FlexTable child */
  width: _react.PropTypes.number.isRequired
};
exports.default = ColumnSizer;
},{"../Grid":62,"react":undefined,"react-addons-shallow-compare":30}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSizer = exports.default = undefined;

var _ColumnSizer2 = require('./ColumnSizer');

var _ColumnSizer3 = _interopRequireDefault(_ColumnSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColumnSizer3.default;
exports.ColumnSizer = _ColumnSizer3.default;
},{"./ColumnSizer":49}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _defaultHeaderRenderer = require('./defaultHeaderRenderer');

var _defaultHeaderRenderer2 = _interopRequireDefault(_defaultHeaderRenderer);

var _defaultCellRenderer = require('./defaultCellRenderer');

var _defaultCellRenderer2 = _interopRequireDefault(_defaultCellRenderer);

var _defaultCellDataGetter = require('./defaultCellDataGetter');

var _defaultCellDataGetter2 = _interopRequireDefault(_defaultCellDataGetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Describes the header and cell contents of a table column.
 */
var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  cellDataGetter: _defaultCellDataGetter2.default,
  cellRenderer: _defaultCellRenderer2.default,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: _defaultHeaderRenderer2.default,
  style: {}
};
Column.propTypes = {
  /** Optional aria-label value to set on the column header */
  'aria-label': _react.PropTypes.string,

  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * ({ columnData: any, dataKey: string, rowData: any }): any
   */
  cellDataGetter: _react.PropTypes.func,

  /**
   * Callback responsible for rendering a cell's contents.
   * ({ cellData: any, columnData: any, dataKey: string, rowData: any, rowIndex: number }): node
   */
  cellRenderer: _react.PropTypes.func,

  /** Optional CSS class to apply to cell */
  className: _react.PropTypes.string,

  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _react.PropTypes.object,

  /** Uniquely identifies the row-data attribute correspnding to this cell */
  dataKey: _react.PropTypes.any.isRequired,

  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _react.PropTypes.bool,

  /** Flex grow style; defaults to 0 */
  flexGrow: _react.PropTypes.number,

  /** Flex shrink style; defaults to 1 */
  flexShrink: _react.PropTypes.number,

  /** Optional CSS class to apply to this column's header */
  headerClassName: _react.PropTypes.string,

  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: string, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _react.PropTypes.func.isRequired,

  /** Header label for this column */
  label: _react.PropTypes.string,

  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _react.PropTypes.number,

  /** Minimum width of column. */
  minWidth: _react.PropTypes.number,

  /** Optional inline style to apply to cell */
  style: _react.PropTypes.object,

  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _react.PropTypes.number.isRequired
};
exports.default = Column;
},{"./defaultCellDataGetter":55,"./defaultCellRenderer":56,"./defaultHeaderRenderer":57,"react":undefined}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlexColumn = require('./FlexColumn');

var _FlexColumn2 = _interopRequireDefault(_FlexColumn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _defaultRowRenderer = require('./defaultRowRenderer');

var _defaultRowRenderer2 = _interopRequireDefault(_defaultRowRenderer);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */
var FlexTable = function (_Component) {
  _inherits(FlexTable, _Component);

  function FlexTable(props) {
    _classCallCheck(this, FlexTable);

    var _this = _possibleConstructorReturn(this, (FlexTable.__proto__ || Object.getPrototypeOf(FlexTable)).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._cellClassName = _this._cellClassName.bind(_this);
    _this._cellStyle = _this._cellStyle.bind(_this);
    _this._createColumn = _this._createColumn.bind(_this);
    _this._createRow = _this._createRow.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(FlexTable, [{
    key: 'forceUpdateGrid',
    value: function forceUpdateGrid() {
      this.Grid.forceUpdate();
    }

    /** See Grid#measureAllCells */

  }, {
    key: 'measureAllRows',
    value: function measureAllRows() {
      this.Grid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */

  }, {
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this.Grid.recomputeGridSize({
        rowIndex: index
      });
      this.forceUpdateGrid();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var gridClassName = _props.gridClassName;
      var gridStyle = _props.gridStyle;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var rowClassName = _props.rowClassName;
      var rowStyle = _props.rowStyle;
      var scrollToIndex = _props.scrollToIndex;
      var style = _props.style;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      var rowClass = rowClassName instanceof Function ? rowClassName({ index: -1 }) : rowClassName;
      var rowStyleObject = rowStyle instanceof Function ? rowStyle({ index: -1 }) : rowStyle;

      // Precompute and cache column styles before rendering rows and columns to speed things up
      this._cachedColumnStyles = [];
      _react2.default.Children.toArray(children).forEach(function (column, index) {
        _this2._cachedColumnStyles[index] = _this2._getFlexStyleForColumn(column, column.props.style);
      });

      // Note that we specify :numChildren, :scrollbarWidth, :sortBy, and :sortDirection as properties on Grid even though these have nothing to do with Grid.
      // This is done because Grid is a pure component and won't update unless its properties or state has changed.
      // Any property that should trigger a re-render of Grid then is specified here to avoid a stale display.
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('FlexTable', className),
          style: style
        },
        !disableHeader && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('FlexTable__headerRow', rowClass),
            style: _extends({}, rowStyleObject, {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            })
          },
          this._getRenderedHeaderRow()
        ),
        _react2.default.createElement(_Grid2.default, _extends({}, this.props, {
          autoContainerWidth: true,
          className: (0, _classnames2.default)('FlexTable__Grid', gridClassName),
          cellClassName: this._cellClassName,
          cellRenderer: this._createRow,
          cellStyle: this._cellStyle,
          columnWidth: width,
          columnCount: 1,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: this._onScroll,
          onSectionRendered: this._onSectionRendered,
          ref: function ref(_ref) {
            _this2.Grid = _ref;
          },
          scrollbarWidth: scrollbarWidth,
          scrollToRow: scrollToIndex,
          style: gridStyle
        }))
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_cellClassName',
    value: function _cellClassName(_ref2) {
      var rowIndex = _ref2.rowIndex;
      var rowWrapperClassName = this.props.rowWrapperClassName;


      return rowWrapperClassName instanceof Function ? rowWrapperClassName({ index: rowIndex - 1 }) : rowWrapperClassName;
    }
  }, {
    key: '_cellStyle',
    value: function _cellStyle(_ref3) {
      var rowIndex = _ref3.rowIndex;
      var rowWrapperStyle = this.props.rowWrapperStyle;


      return rowWrapperStyle instanceof Function ? rowWrapperStyle({ index: rowIndex - 1 }) : rowWrapperStyle;
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(_ref4) {
      var column = _ref4.column;
      var columnIndex = _ref4.columnIndex;
      var isScrolling = _ref4.isScrolling;
      var rowData = _ref4.rowData;
      var rowIndex = _ref4.rowIndex;
      var _column$props = column.props;
      var cellDataGetter = _column$props.cellDataGetter;
      var cellRenderer = _column$props.cellRenderer;
      var className = _column$props.className;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;


      var cellData = cellDataGetter({ columnData: columnData, dataKey: dataKey, rowData: rowData });
      var renderedCell = cellRenderer({ cellData: cellData, columnData: columnData, dataKey: dataKey, isScrolling: isScrolling, rowData: rowData, rowIndex: rowIndex });

      var style = this._cachedColumnStyles[columnIndex];

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: (0, _classnames2.default)('FlexTable__rowColumn', className),
          style: style,
          title: title
        },
        renderedCell
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(_ref5) {
      var column = _ref5.column;
      var index = _ref5.index;
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var headerStyle = _props2.headerStyle;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = (0, _classnames2.default)('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column, headerStyle);

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      var a11yProps = {};

      if (sortEnabled || onHeaderClick) {
        (function () {
          // If this is a sortable header, clicking it should update the table data's sorting.
          var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;

          var onClick = function onClick() {
            sortEnabled && sort({
              sortBy: dataKey,
              sortDirection: newSortDirection
            });
            onHeaderClick && onHeaderClick({ columnData: columnData, dataKey: dataKey });
          };

          var onKeyDown = function onKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
              onClick();
            }
          };

          a11yProps['aria-label'] = column.props['aria-label'] || label || dataKey;
          a11yProps.role = 'rowheader';
          a11yProps.tabIndex = 0;
          a11yProps.onClick = onClick;
          a11yProps.onKeyDown = onKeyDown;
        })();
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: 'Header-Col' + index,
          className: classNames,
          style: style
        }),
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(_ref6) {
      var _this3 = this;

      var index = _ref6.rowIndex;
      var isScrolling = _ref6.isScrolling;
      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var onRowDoubleClick = _props3.onRowDoubleClick;
      var onRowMouseOver = _props3.onRowMouseOver;
      var onRowMouseOut = _props3.onRowMouseOut;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var rowRenderer = _props3.rowRenderer;
      var rowStyle = _props3.rowStyle;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName({ index: index }) : rowClassName;
      var rowStyleObject = rowStyle instanceof Function ? rowStyle({ index: index }) : rowStyle;
      var rowData = rowGetter({ index: index });

      var columns = _react2.default.Children.toArray(children).map(function (column, columnIndex) {
        return _this3._createColumn({
          column: column,
          columnIndex: columnIndex,
          isScrolling: isScrolling,
          rowData: rowData,
          rowIndex: index,
          scrollbarWidth: scrollbarWidth
        });
      });

      var className = (0, _classnames2.default)('FlexTable__row', rowClass);
      var style = _extends({}, rowStyleObject, {
        height: this._getRowHeight(index),
        paddingRight: scrollbarWidth
      });

      return rowRenderer({
        className: className,
        columns: columns,
        index: index,
        isScrolling: isScrolling,
        onRowClick: onRowClick,
        onRowDoubleClick: onRowDoubleClick,
        onRowMouseOver: onRowMouseOver,
        onRowMouseOut: onRowMouseOut,
        rowData: rowData,
        style: style
      });
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var customStyle = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = _extends({}, customStyle, {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      });

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : _react2.default.Children.toArray(children);

      return items.map(function (column, index) {
        return _this4._createHeader({ column: column, index: index });
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight({ index: rowIndex }) : rowHeight;
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref7) {
      var clientHeight = _ref7.clientHeight;
      var scrollHeight = _ref7.scrollHeight;
      var scrollTop = _ref7.scrollTop;
      var onScroll = this.props.onScroll;


      onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref8) {
      var rowOverscanStartIndex = _ref8.rowOverscanStartIndex;
      var rowOverscanStopIndex = _ref8.rowOverscanStopIndex;
      var rowStartIndex = _ref8.rowStartIndex;
      var rowStopIndex = _ref8.rowStopIndex;
      var onRowsRendered = this.props.onRowsRendered;


      onRowsRendered({
        overscanStartIndex: rowOverscanStartIndex,
        overscanStopIndex: rowOverscanStopIndex,
        startIndex: rowStartIndex,
        stopIndex: rowStopIndex
      });
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = (0, _reactDom.findDOMNode)(this.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);

  return FlexTable;
}(_react.Component);

FlexTable.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight: _react.PropTypes.bool,

  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = _react2.default.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== _FlexColumn2.default) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: _react.PropTypes.bool,

  /**
   * Used to estimate the total height of a FlexTable before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: _react.PropTypes.number.isRequired,

  /** Optional custom CSS class name to attach to inner Grid element. */
  gridClassName: _react.PropTypes.string,

  /** Optional inline style to attach to inner Grid element. */
  gridStyle: _react.PropTypes.object,

  /** Optional CSS class to apply to all column headers */
  headerClassName: _react.PropTypes.string,

  /** Fixed height of header row */
  headerHeight: _react.PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowCount is 0 */
  noRowsRenderer: _react.PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * ({ columnData: any, dataKey: string }): void
  */
  onHeaderClick: _react.PropTypes.func,

  /** Optional custom inline style to attach to table header columns. */
  headerStyle: _react.PropTypes.object,

  /**
   * Callback invoked when a user clicks on a table row.
   * ({ index: number }): void
   */
  onRowClick: _react.PropTypes.func,

  /**
   * Callback invoked when a user double-clicks on a table row.
   * ({ index: number }): void
   */
  onRowDoubleClick: _react.PropTypes.func,

  /**
   * Callback invoked when the mouse leaves a table row.
   * ({ index: number }): void
   */
  onRowMouseOut: _react.PropTypes.func,

  /**
   * Callback invoked when a user moves the mouse over a table row.
   * ({ index: number }): void
   */
  onRowMouseOver: _react.PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount: _react.PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: ({ index: number }): string
   */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * ({ index: number }): any
   */
  rowGetter: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * ({ index: number }): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a table row given an array of columns:
   * Should implement the following interface: ({
   *   className: string,
   *   columns: Array,
   *   index: number,
   *   isScrolling: boolean,
   *   onRowClick: ?Function,
   *   onRowDoubleClick: ?Function,
   *   onRowMouseOver: ?Function,
   *   onRowMouseOut: ?Function,
   *   rowData: any,
   *   style: any
   * }): PropTypes.node
   */
  rowRenderer: _react.PropTypes.func,

  /** Optional custom inline style to attach to table rows. */
  rowStyle: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired,

  /** Optional custom CSS class for individual rows */
  rowWrapperClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /** Optional custom CSS class for individual rows */
  rowWrapperStyle: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

  /** See Grid#scrollToAlignment */
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * ({ sortBy: string, sortDirection: SortDirection }): void
   */
  sort: _react.PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: _react.PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC]),

  /** Optional inline style */
  style: _react.PropTypes.object,

  /** Tab index for focus */
  tabIndex: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  estimatedRowSize: 30,
  headerHeight: 0,
  headerStyle: {},
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowCount: 10,
  rowRenderer: _defaultRowRenderer2.default,
  rowStyle: {},
  scrollToAlignment: 'auto',
  style: {}
};
exports.default = FlexTable;
},{"../Grid":62,"./FlexColumn":51,"./SortDirection":53,"./defaultRowRenderer":58,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":30,"react-dom":undefined}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC'
};

exports.default = SortDirection;
},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator(_ref) {
  var sortDirection = _ref.sortDirection;

  var classNames = (0, _classnames2.default)('FlexTable__sortableHeaderIcon', {
    'FlexTable__sortableHeaderIcon--ASC': sortDirection === _SortDirection2.default.ASC,
    'FlexTable__sortableHeaderIcon--DESC': sortDirection === _SortDirection2.default.DESC
  });

  return _react2.default.createElement(
    'svg',
    {
      className: classNames,
      width: 18,
      height: 18,
      viewBox: '0 0 24 24'
    },
    sortDirection === _SortDirection2.default.ASC ? _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }) : _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
  );
}
SortIndicator.propTypes = {
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC])
};
},{"./SortDirection":53,"classnames":undefined,"react":undefined}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultCellDataGetter;


/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
function defaultCellDataGetter(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var rowData = _ref.rowData;

  if (rowData.get instanceof Function) {
    return rowData.get(dataKey);
  } else {
    return rowData[dataKey];
  }
}
},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultCellRenderer;


/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
function defaultCellRenderer(_ref) {
  var cellData = _ref.cellData;
  var cellDataKey = _ref.cellDataKey;
  var columnData = _ref.columnData;
  var rowData = _ref.rowData;
  var rowIndex = _ref.rowIndex;

  if (cellData == null) {
    return '';
  } else {
    return String(cellData);
  }
}
},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SortIndicator = require('./SortIndicator');

var _SortIndicator2 = _interopRequireDefault(_SortIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default table header renderer.
 */
function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var disableSort = _ref.disableSort;
  var label = _ref.label;
  var sortBy = _ref.sortBy;
  var sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [_react2.default.createElement(
    'span',
    {
      className: 'FlexTable__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(_react2.default.createElement(_SortIndicator2.default, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}
},{"./SortIndicator":54,"react":undefined}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = defaultRowRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default row renderer for FlexTable.
 */
function defaultRowRenderer(_ref) {
  var className = _ref.className;
  var columns = _ref.columns;
  var index = _ref.index;
  var isScrolling = _ref.isScrolling;
  var onRowClick = _ref.onRowClick;
  var onRowDoubleClick = _ref.onRowDoubleClick;
  var onRowMouseOver = _ref.onRowMouseOver;
  var onRowMouseOut = _ref.onRowMouseOut;
  var rowData = _ref.rowData;
  var style = _ref.style;

  var a11yProps = {};

  if (onRowClick || onRowDoubleClick || onRowMouseOver || onRowMouseOut) {
    a11yProps['aria-label'] = 'row';
    a11yProps.role = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = function () {
        return onRowClick({ index: index });
      };
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = function () {
        return onRowDoubleClick({ index: index });
      };
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = function () {
        return onRowMouseOut({ index: index });
      };
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = function () {
        return onRowMouseOver({ index: index });
      };
    }
  }

  return _react2.default.createElement(
    'div',
    _extends({}, a11yProps, {
      className: className,
      style: style
    }),
    columns
  );
}
},{"react":undefined}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.SortDirection = exports.FlexColumn = exports.FlexTable = exports.defaultRowRenderer = exports.defaultHeaderRenderer = exports.defaultCellRenderer = exports.defaultCellDataGetter = exports.default = undefined;

var _FlexTable2 = require('./FlexTable');

var _FlexTable3 = _interopRequireDefault(_FlexTable2);

var _defaultCellDataGetter2 = require('./defaultCellDataGetter');

var _defaultCellDataGetter3 = _interopRequireDefault(_defaultCellDataGetter2);

var _defaultCellRenderer2 = require('./defaultCellRenderer');

var _defaultCellRenderer3 = _interopRequireDefault(_defaultCellRenderer2);

var _defaultHeaderRenderer2 = require('./defaultHeaderRenderer');

var _defaultHeaderRenderer3 = _interopRequireDefault(_defaultHeaderRenderer2);

var _defaultRowRenderer2 = require('./defaultRowRenderer');

var _defaultRowRenderer3 = _interopRequireDefault(_defaultRowRenderer2);

var _FlexColumn2 = require('./FlexColumn');

var _FlexColumn3 = _interopRequireDefault(_FlexColumn2);

var _SortDirection2 = require('./SortDirection');

var _SortDirection3 = _interopRequireDefault(_SortDirection2);

var _SortIndicator2 = require('./SortIndicator');

var _SortIndicator3 = _interopRequireDefault(_SortIndicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlexTable3.default;
exports.defaultCellDataGetter = _defaultCellDataGetter3.default;
exports.defaultCellRenderer = _defaultCellRenderer3.default;
exports.defaultHeaderRenderer = _defaultHeaderRenderer3.default;
exports.defaultRowRenderer = _defaultRowRenderer3.default;
exports.FlexTable = _FlexTable3.default;
exports.FlexColumn = _FlexColumn3.default;
exports.SortDirection = _SortDirection3.default;
exports.SortIndicator = _SortIndicator3.default;
},{"./FlexColumn":51,"./FlexTable":52,"./SortDirection":53,"./SortIndicator":54,"./defaultCellDataGetter":55,"./defaultCellRenderer":56,"./defaultHeaderRenderer":57,"./defaultRowRenderer":58}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateSizeAndPositionDataAndUpdateScrollOffset = require('./utils/calculateSizeAndPositionDataAndUpdateScrollOffset');

var _calculateSizeAndPositionDataAndUpdateScrollOffset2 = _interopRequireDefault(_calculateSizeAndPositionDataAndUpdateScrollOffset);

var _ScalingCellSizeAndPositionManager = require('./utils/ScalingCellSizeAndPositionManager');

var _ScalingCellSizeAndPositionManager2 = _interopRequireDefault(_ScalingCellSizeAndPositionManager);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _getOverscanIndices = require('./utils/getOverscanIndices');

var _getOverscanIndices2 = _interopRequireDefault(_getOverscanIndices);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _updateScrollIndexHelper = require('./utils/updateScrollIndexHelper');

var _updateScrollIndexHelper2 = _interopRequireDefault(_updateScrollIndexHelper);

var _defaultCellRangeRenderer = require('./defaultCellRangeRenderer');

var _defaultCellRangeRenderer2 = _interopRequireDefault(_defaultCellRangeRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var DEFAULT_SCROLLING_RESET_TIME_INTERVAL = exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props, context) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props, context));

    _this.state = {
      isScrolling: false,
      scrollDirectionHorizontal: _getOverscanIndices.SCROLL_DIRECTION_FIXED,
      scrollDirectionVertical: _getOverscanIndices.SCROLL_DIRECTION_FIXED,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes onSectionRendered callback only when start/stop row or column indices change
    _this._onGridRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._enablePointerEventsAfterDelayCallback = _this._enablePointerEventsAfterDelayCallback.bind(_this);
    _this._invokeOnGridRenderedHelper = _this._invokeOnGridRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setNextStateCallback = _this._setNextStateCallback.bind(_this);
    _this._updateScrollLeftForScrollToColumn = _this._updateScrollLeftForScrollToColumn.bind(_this);
    _this._updateScrollTopForScrollToRow = _this._updateScrollTopForScrollToRow.bind(_this);

    _this._columnWidthGetter = _this._wrapSizeGetter(props.columnWidth);
    _this._rowHeightGetter = _this._wrapSizeGetter(props.rowHeight);

    _this._columnSizeAndPositionManager = new _ScalingCellSizeAndPositionManager2.default({
      cellCount: props.columnCount,
      cellSizeGetter: function cellSizeGetter(index) {
        return _this._columnWidthGetter(index);
      },
      estimatedCellSize: _this._getEstimatedColumnSize(props)
    });
    _this._rowSizeAndPositionManager = new _ScalingCellSizeAndPositionManager2.default({
      cellCount: props.rowCount,
      cellSizeGetter: function cellSizeGetter(index) {
        return _this._rowHeightGetter(index);
      },
      estimatedCellSize: _this._getEstimatedRowSize(props)
    });

    // See defaultCellRangeRenderer() for more information on the usage of this cache
    _this._cellCache = {};
    return _this;
  }

  /**
   * Pre-measure all columns and rows in a Grid.
   * Typically cells are only measured as needed and estimated sizes are used for cells that have not yet been measured.
   * This method ensures that the next call to getTotalSize() returns an exact size (as opposed to just an estimated one).
   */


  _createClass(Grid, [{
    key: 'measureAllCells',
    value: function measureAllCells() {
      var _props = this.props;
      var columnCount = _props.columnCount;
      var rowCount = _props.rowCount;


      this._columnSizeAndPositionManager.getSizeAndPositionOfCell(columnCount - 1);
      this._rowSizeAndPositionManager.getSizeAndPositionOfCell(rowCount - 1);
    }

    /**
     * Forced recompute of row heights and column widths.
     * This function should be called if dynamic column or row sizes have changed but nothing else has.
     * Since Grid only receives :columnCount and :rowCount it has no way of detecting when the underlying data changes.
     */

  }, {
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$columnIndex = _ref.columnIndex;
      var columnIndex = _ref$columnIndex === undefined ? 0 : _ref$columnIndex;
      var _ref$rowIndex = _ref.rowIndex;
      var rowIndex = _ref$rowIndex === undefined ? 0 : _ref$rowIndex;

      this._columnSizeAndPositionManager.resetCell(columnIndex);
      this._rowSizeAndPositionManager.resetCell(rowIndex);

      // Clear cell cache in case we are scrolling;
      // Invalid row heights likely mean invalid cached content as well.
      this._cellCache = {};

      this.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var scrollLeft = _props2.scrollLeft;
      var scrollToColumn = _props2.scrollToColumn;
      var scrollTop = _props2.scrollTop;
      var scrollToRow = _props2.scrollToRow;

      // If this component was first rendered server-side, scrollbar size will be undefined.
      // In that event we need to remeasure.

      if (!this._scrollbarSizeMeasured) {
        this._scrollbarSize = (0, _scrollbarSize2.default)();
        this._scrollbarSizeMeasured = true;
        this.setState({});
      }

      if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      if (scrollToColumn >= 0 || scrollToRow >= 0) {
        this._updateScrollLeftForScrollToColumn();
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._columnSizeAndPositionManager.getTotalSize(),
        totalRowsHeight: this._rowSizeAndPositionManager.getTotalSize()
      });
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _props3 = this.props;
      var autoHeight = _props3.autoHeight;
      var columnCount = _props3.columnCount;
      var height = _props3.height;
      var rowCount = _props3.rowCount;
      var scrollToAlignment = _props3.scrollToAlignment;
      var scrollToColumn = _props3.scrollToColumn;
      var scrollToRow = _props3.scrollToRow;
      var width = _props3.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Handle edge case where column or row count has only just increased over 0.
      // In this case we may have to restore a previously-specified scroll offset.
      // For more info see bvaughn/react-virtualized/issues/218

      var columnOrRowCountJustIncreasedFromZero = columnCount > 0 && prevProps.columnCount === 0 || rowCount > 0 && prevProps.rowCount === 0;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.
      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && (scrollLeft !== prevState.scrollLeft && scrollLeft !== this._scrollingContainer.scrollLeft || columnOrRowCountJustIncreasedFromZero)) {
          this._scrollingContainer.scrollLeft = scrollLeft;
        }

        // @TRICKY :autoHeight property instructs Grid to leave :scrollTop management to an external HOC (eg WindowScroller).
        // In this case we should avoid checking scrollingContainer.scrollTop since it forces layout/flow.
        if (!autoHeight && scrollTop >= 0 && (scrollTop !== prevState.scrollTop && scrollTop !== this._scrollingContainer.scrollTop || columnOrRowCountJustIncreasedFromZero)) {
          this._scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      // @TODO Do we also need this check or can the one in componentWillUpdate() suffice?
      (0, _updateScrollIndexHelper2.default)({
        cellSizeAndPositionManager: this._columnSizeAndPositionManager,
        previousCellsCount: prevProps.columnCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToAlignment: prevProps.scrollToAlignment,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToAlignment: scrollToAlignment,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToColumn) {
          return _this2._updateScrollLeftForScrollToColumn(_extends({}, _this2.props, { scrollToColumn: scrollToColumn }));
        }
      });
      (0, _updateScrollIndexHelper2.default)({
        cellSizeAndPositionManager: this._rowSizeAndPositionManager,
        previousCellsCount: prevProps.rowCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToAlignment: prevProps.scrollToAlignment,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToAlignment: scrollToAlignment,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToRow) {
          return _this2._updateScrollTopForScrollToRow(_extends({}, _this2.props, { scrollToRow: scrollToRow }));
        }
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // If this component is being rendered server-side, getScrollbarSize() will return undefined.
      // We handle this case in componentDidMount()
      this._scrollbarSize = (0, _scrollbarSize2.default)();
      if (this._scrollbarSize === undefined) {
        this._scrollbarSizeMeasured = false;
        this._scrollbarSize = 0;
      } else {
        this._scrollbarSizeMeasured = true;
      }

      this._calculateChildrenToRender();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this3 = this;

      if (nextProps.columnCount === 0 && nextState.scrollLeft !== 0 || nextProps.rowCount === 0 && nextState.scrollTop !== 0) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      this._columnWidthGetter = this._wrapSizeGetter(nextProps.columnWidth);
      this._rowHeightGetter = this._wrapSizeGetter(nextProps.rowHeight);

      this._columnSizeAndPositionManager.configure({
        cellCount: nextProps.columnCount,
        estimatedCellSize: this._getEstimatedColumnSize(nextProps)
      });
      this._rowSizeAndPositionManager.configure({
        cellCount: nextProps.rowCount,
        estimatedCellSize: this._getEstimatedRowSize(nextProps)
      });

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.columnCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: function computeMetadataCallback() {
          return _this3._columnSizeAndPositionManager.resetCell(0);
        },
        computeMetadataCallbackProps: nextProps,
        nextCellsCount: nextProps.columnCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollLeftForScrollToColumn(nextProps, nextState);
        }
      });
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.rowCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: function computeMetadataCallback() {
          return _this3._rowSizeAndPositionManager.resetCell(0);
        },
        computeMetadataCallbackProps: nextProps,
        nextCellsCount: nextProps.rowCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollTopForScrollToRow(nextProps, nextState);
        }
      });

      this._calculateChildrenToRender(nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props4 = this.props;
      var autoContainerWidth = _props4.autoContainerWidth;
      var autoHeight = _props4.autoHeight;
      var className = _props4.className;
      var height = _props4.height;
      var noContentRenderer = _props4.noContentRenderer;
      var style = _props4.style;
      var tabIndex = _props4.tabIndex;
      var width = _props4.width;
      var isScrolling = this.state.isScrolling;


      var gridStyle = {
        height: autoHeight ? 'auto' : height,
        width: width
      };

      var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
      var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      var verticalScrollBarSize = totalRowsHeight > height ? this._scrollbarSize : 0;
      var horizontalScrollBarSize = totalColumnsWidth > width ? this._scrollbarSize : 0;

      // Also explicitly init styles to 'auto' if scrollbars are required.
      // This works around an obscure edge case where external CSS styles have not yet been loaded,
      // But an initial scroll index of offset is set as an external prop.
      // Without this style, Grid would render the correct range of cells but would NOT update its internal offset.
      // This was originally reported via clauderic/react-infinite-calendar/issues/23
      gridStyle.overflowX = totalColumnsWidth + verticalScrollBarSize <= width ? 'hidden' : 'auto';
      gridStyle.overflowY = totalRowsHeight + horizontalScrollBarSize <= height ? 'hidden' : 'auto';

      var childrenToDisplay = this._childrenToDisplay;

      var showNoContentRenderer = childrenToDisplay.length === 0 && height > 0 && width > 0;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(_ref2) {
            _this4._scrollingContainer = _ref2;
          },
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: _extends({}, gridStyle, style),
          tabIndex: tabIndex
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Grid__innerScrollContainer',
            style: {
              width: autoContainerWidth ? 'auto' : totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              pointerEvents: isScrolling ? 'none' : ''
            }
          },
          childrenToDisplay
        ),
        showNoContentRenderer && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_calculateChildrenToRender',
    value: function _calculateChildrenToRender() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];
      var cellClassName = props.cellClassName;
      var cellRenderer = props.cellRenderer;
      var cellRangeRenderer = props.cellRangeRenderer;
      var cellStyle = props.cellStyle;
      var columnCount = props.columnCount;
      var height = props.height;
      var overscanColumnCount = props.overscanColumnCount;
      var overscanRowCount = props.overscanRowCount;
      var rowCount = props.rowCount;
      var width = props.width;
      var isScrolling = state.isScrolling;
      var scrollDirectionHorizontal = state.scrollDirectionHorizontal;
      var scrollDirectionVertical = state.scrollDirectionVertical;
      var scrollLeft = state.scrollLeft;
      var scrollTop = state.scrollTop;


      this._childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = this._columnSizeAndPositionManager.getVisibleCellRange({
          containerSize: width,
          offset: scrollLeft
        });
        var visibleRowIndices = this._rowSizeAndPositionManager.getVisibleCellRange({
          containerSize: height,
          offset: scrollTop
        });

        var horizontalOffsetAdjustment = this._columnSizeAndPositionManager.getOffsetAdjustment({
          containerSize: width,
          offset: scrollLeft
        });
        var verticalOffsetAdjustment = this._rowSizeAndPositionManager.getOffsetAdjustment({
          containerSize: height,
          offset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _getOverscanIndices2.default)({
          cellCount: columnCount,
          overscanCellsCount: overscanColumnCount,
          scrollDirection: scrollDirectionHorizontal,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _getOverscanIndices2.default)({
          cellCount: rowCount,
          overscanCellsCount: overscanRowCount,
          scrollDirection: scrollDirectionVertical,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        this._childrenToDisplay = cellRangeRenderer({
          cellCache: this._cellCache,
          cellClassName: this._wrapCellClassNameGetter(cellClassName),
          cellRenderer: cellRenderer,
          cellStyle: this._wrapCellStyleGetter(cellStyle),
          columnSizeAndPositionManager: this._columnSizeAndPositionManager,
          columnStartIndex: this._columnStartIndex,
          columnStopIndex: this._columnStopIndex,
          horizontalOffsetAdjustment: horizontalOffsetAdjustment,
          isScrolling: isScrolling,
          rowSizeAndPositionManager: this._rowSizeAndPositionManager,
          rowStartIndex: this._rowStartIndex,
          rowStopIndex: this._rowStopIndex,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          verticalOffsetAdjustment: verticalOffsetAdjustment
        });
      }
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var scrollingResetTimeInterval = this.props.scrollingResetTimeInterval;


      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(this._enablePointerEventsAfterDelayCallback, scrollingResetTimeInterval);
    }
  }, {
    key: '_enablePointerEventsAfterDelayCallback',
    value: function _enablePointerEventsAfterDelayCallback() {
      this._disablePointerEventsTimeoutId = null;

      // Throw away cell cache once scrolling is complete
      this._cellCache = {};

      this.setState({
        isScrolling: false,
        scrollDirectionHorizontal: _getOverscanIndices.SCROLL_DIRECTION_FIXED,
        scrollDirectionVertical: _getOverscanIndices.SCROLL_DIRECTION_FIXED
      });
    }
  }, {
    key: '_getEstimatedColumnSize',
    value: function _getEstimatedColumnSize(props) {
      return typeof props.columnWidth === 'number' ? props.columnWidth : props.estimatedColumnSize;
    }
  }, {
    key: '_getEstimatedRowSize',
    value: function _getEstimatedRowSize(props) {
      return typeof props.rowHeight === 'number' ? props.rowHeight : props.estimatedRowSize;
    }
  }, {
    key: '_invokeOnGridRenderedHelper',
    value: function _invokeOnGridRenderedHelper() {
      var onSectionRendered = this.props.onSectionRendered;


      this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: this._columnStartIndex,
          columnOverscanStopIndex: this._columnStopIndex,
          columnStartIndex: this._renderedColumnStartIndex,
          columnStopIndex: this._renderedColumnStopIndex,
          rowOverscanStartIndex: this._rowStartIndex,
          rowOverscanStopIndex: this._rowStopIndex,
          rowStartIndex: this._renderedRowStartIndex,
          rowStopIndex: this._renderedRowStopIndex
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref3) {
      var _this5 = this;

      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;
      var totalColumnsWidth = _ref3.totalColumnsWidth;
      var totalRowsHeight = _ref3.totalRowsHeight;

      this._onScrollMemoizer({
        callback: function callback(_ref4) {
          var scrollLeft = _ref4.scrollLeft;
          var scrollTop = _ref4.scrollTop;
          var _props5 = _this5.props;
          var height = _props5.height;
          var onScroll = _props5.onScroll;
          var width = _props5.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      this._nextState = state;

      if (!this._setNextStateAnimationFrameId) {
        this._setNextStateAnimationFrameId = (0, _raf2.default)(this._setNextStateCallback);
      }
    }
  }, {
    key: '_setNextStateCallback',
    value: function _setNextStateCallback() {
      var state = this._nextState;

      this._setNextStateAnimationFrameId = null;
      this._nextState = null;

      this.setState(state);
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref5) {
      var scrollLeft = _ref5.scrollLeft;
      var scrollTop = _ref5.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_wrapCellClassNameGetter',
    value: function _wrapCellClassNameGetter(className) {
      return this._wrapPropertyGetter(className);
    }
  }, {
    key: '_wrapCellStyleGetter',
    value: function _wrapCellStyleGetter(style) {
      return this._wrapPropertyGetter(style);
    }
  }, {
    key: '_wrapPropertyGetter',
    value: function _wrapPropertyGetter(value) {
      return value instanceof Function ? value : function () {
        return value;
      };
    }
  }, {
    key: '_wrapSizeGetter',
    value: function _wrapSizeGetter(size) {
      return this._wrapPropertyGetter(size);
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];
      var columnCount = props.columnCount;
      var scrollToAlignment = props.scrollToAlignment;
      var scrollToColumn = props.scrollToColumn;
      var width = props.width;
      var scrollLeft = state.scrollLeft;


      if (scrollToColumn >= 0 && columnCount > 0) {
        var targetIndex = Math.max(0, Math.min(columnCount - 1, scrollToColumn));

        var calculatedScrollLeft = this._columnSizeAndPositionManager.getUpdatedOffsetForIndex({
          align: scrollToAlignment,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: targetIndex
        });

        if (scrollLeft !== calculatedScrollLeft) {
          this._setScrollPosition({
            scrollLeft: calculatedScrollLeft
          });
        }
      }
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];
      var height = props.height;
      var rowCount = props.rowCount;
      var scrollToAlignment = props.scrollToAlignment;
      var scrollToRow = props.scrollToRow;
      var scrollTop = state.scrollTop;


      if (scrollToRow >= 0 && rowCount > 0) {
        var targetIndex = Math.max(0, Math.min(rowCount - 1, scrollToRow));

        var calculatedScrollTop = this._rowSizeAndPositionManager.getUpdatedOffsetForIndex({
          align: scrollToAlignment,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: targetIndex
        });

        if (scrollTop !== calculatedScrollTop) {
          this._setScrollPosition({
            scrollTop: calculatedScrollTop
          });
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this._scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props6 = this.props;
      var height = _props6.height;
      var width = _props6.width;

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();
      var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
      var scrollLeft = Math.min(Math.max(0, totalColumnsWidth - width + scrollbarSize), event.target.scrollLeft);
      var scrollTop = Math.min(Math.max(0, totalRowsHeight - height + scrollbarSize), event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        // Track scrolling direction so we can more efficiently overscan rows to reduce empty space around the edges while scrolling.
        var scrollDirectionVertical = scrollTop > this.state.scrollTop ? _getOverscanIndices.SCROLL_DIRECTION_FORWARD : _getOverscanIndices.SCROLL_DIRECTION_BACKWARD;
        var scrollDirectionHorizontal = scrollLeft > this.state.scrollLeft ? _getOverscanIndices.SCROLL_DIRECTION_FORWARD : _getOverscanIndices.SCROLL_DIRECTION_BACKWARD;

        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollDirectionHorizontal: scrollDirectionHorizontal,
          scrollDirectionVertical: scrollDirectionVertical,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({ scrollLeft: scrollLeft, scrollTop: scrollTop, totalColumnsWidth: totalColumnsWidth, totalRowsHeight: totalRowsHeight });
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Set the width of the inner scrollable container to 'auto'.
   * This is useful for single-column Grids to ensure that the column doesn't extend below a vertical scrollbar.
   */
  autoContainerWidth: _react.PropTypes.bool,

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight: _react.PropTypes.bool,

  /** Optional custom CSS class for individual cells */
  cellClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /** Optional custom styles for individual cells */
  cellStyle: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a group of cells given their index ranges.
   * Should implement the following interface: ({
   *   cellCache: Map,
   *   cellRenderer: Function,
   *   columnSizeAndPositionManager: CellSizeAndPositionManager,
   *   columnStartIndex: number,
   *   columnStopIndex: number,
   *   isScrolling: boolean,
   *   rowSizeAndPositionManager: CellSizeAndPositionManager,
   *   rowStartIndex: number,
   *   rowStopIndex: number,
   *   scrollLeft: number,
   *   scrollTop: number
   * }): Array<PropTypes.node>
   */
  cellRangeRenderer: _react.PropTypes.func.isRequired,

  /**
   * Optional custom CSS class name to attach to root Grid element.
   */
  className: _react.PropTypes.string,

  /**
   * Number of columns in grid.
   */
  columnCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed column width (number) or a function that returns the width of a column given its index.
   * Should implement the following interface: (index: number): number
   */
  columnWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Used to estimate the total width of a Grid before all of its columns have actually been measured.
   * The estimated total width is adjusted as columns are rendered.
   */
  estimatedColumnSize: _react.PropTypes.number.isRequired,

  /**
   * Used to estimate the total height of a Grid before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: _react.PropTypes.number.isRequired,

  /**
   * Height of Grid; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowCount or :columnCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnCount: _react.PropTypes.number.isRequired,

  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: ({ index: number }): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Number of rows in grid.
   */
  rowCount: _react.PropTypes.number.isRequired,

  /** Wait this amount of time after the last scroll event before resetting Grid `pointer-events`. */
  scrollingResetTimeInterval: _react.PropTypes.number,

  /** Horizontal offset. */
  scrollLeft: _react.PropTypes.number,

  /**
   * Controls scroll-to-cell behavior of the Grid.
   * The default ("auto") scrolls the least amount possible to ensure that the specified cell is fully visible.
   * Use "start" to align cells to the top/left of the Grid and "end" to align bottom/right.
   */
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow: _react.PropTypes.number,

  /** Optional inline style */
  style: _react.PropTypes.object,

  /** Tab index for focus */
  tabIndex: _react.PropTypes.number,

  /**
   * Width of Grid; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
Grid.defaultProps = {
  'aria-label': 'grid',
  cellStyle: {},
  cellRangeRenderer: _defaultCellRangeRenderer2.default,
  estimatedColumnSize: 100,
  estimatedRowSize: 30,
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  overscanColumnCount: 0,
  overscanRowCount: 10,
  scrollingResetTimeInterval: DEFAULT_SCROLLING_RESET_TIME_INTERVAL,
  scrollToAlignment: 'auto',
  style: {},
  tabIndex: 0
};
exports.default = Grid;
},{"../utils/createCallbackMemoizer":78,"./defaultCellRangeRenderer":61,"./utils/ScalingCellSizeAndPositionManager":64,"./utils/calculateSizeAndPositionDataAndUpdateScrollOffset":65,"./utils/getOverscanIndices":66,"./utils/updateScrollIndexHelper":67,"classnames":undefined,"dom-helpers/util/scrollbarSize":19,"raf":29,"react":undefined,"react-addons-shallow-compare":30}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = defaultCellRangeRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default implementation of cellRangeRenderer used by Grid.
 * This renderer supports cell-caching while the user is scrolling.
 */
function defaultCellRangeRenderer(_ref) {
  var cellCache = _ref.cellCache;
  var cellClassName = _ref.cellClassName;
  var cellRenderer = _ref.cellRenderer;
  var cellStyle = _ref.cellStyle;
  var columnSizeAndPositionManager = _ref.columnSizeAndPositionManager;
  var columnStartIndex = _ref.columnStartIndex;
  var columnStopIndex = _ref.columnStopIndex;
  var horizontalOffsetAdjustment = _ref.horizontalOffsetAdjustment;
  var isScrolling = _ref.isScrolling;
  var rowSizeAndPositionManager = _ref.rowSizeAndPositionManager;
  var rowStartIndex = _ref.rowStartIndex;
  var rowStopIndex = _ref.rowStopIndex;
  var scrollLeft = _ref.scrollLeft;
  var scrollTop = _ref.scrollTop;
  var verticalOffsetAdjustment = _ref.verticalOffsetAdjustment;

  var renderedCells = [];

  for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    var rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex);

    for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
      var columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(columnIndex);
      var key = rowIndex + '-' + columnIndex;
      var cellStyleObject = cellStyle({ rowIndex: rowIndex, columnIndex: columnIndex });
      var renderedCell = void 0;

      // Avoid re-creating cells while scrolling.
      // This can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
      // If a scroll is in progress- cache and reuse cells.
      // This cache will be thrown away once scrolling complets.
      if (isScrolling) {
        if (!cellCache[key]) {
          cellCache[key] = cellRenderer({
            columnIndex: columnIndex,
            isScrolling: isScrolling,
            rowIndex: rowIndex
          });
        }
        renderedCell = cellCache[key];
        // If the user is no longer scrolling, don't cache cells.
        // This makes dynamic cell content difficult for users and would also lead to a heavier memory footprint.
      } else {
        renderedCell = cellRenderer({
          columnIndex: columnIndex,
          isScrolling: isScrolling,
          rowIndex: rowIndex
        });
      }

      if (renderedCell == null || renderedCell === false) {
        continue;
      }

      var className = cellClassName({ columnIndex: columnIndex, rowIndex: rowIndex });

      var child = _react2.default.createElement(
        'div',
        {
          key: key,
          className: (0, _classnames2.default)('Grid__cell', className),
          style: _extends({
            height: rowDatum.size,
            left: columnDatum.offset + horizontalOffsetAdjustment,
            top: rowDatum.offset + verticalOffsetAdjustment,
            width: columnDatum.size
          }, cellStyleObject)
        },
        renderedCell
      );

      renderedCells.push(child);
    }
  }

  return renderedCells;
}
},{"classnames":undefined,"react":undefined}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellRangeRenderer = exports.Grid = exports.default = undefined;

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

var _defaultCellRangeRenderer2 = require('./defaultCellRangeRenderer');

var _defaultCellRangeRenderer3 = _interopRequireDefault(_defaultCellRangeRenderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Grid3.default;
exports.Grid = _Grid3.default;
exports.defaultCellRangeRenderer = _defaultCellRangeRenderer3.default;
},{"./Grid":60,"./defaultCellRangeRenderer":61}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Just-in-time calculates and caches size and position information for a collection of cells.
 */
var CellSizeAndPositionManager = function () {
  function CellSizeAndPositionManager(_ref) {
    var cellCount = _ref.cellCount;
    var cellSizeGetter = _ref.cellSizeGetter;
    var estimatedCellSize = _ref.estimatedCellSize;

    _classCallCheck(this, CellSizeAndPositionManager);

    this._cellSizeGetter = cellSizeGetter;
    this._cellCount = cellCount;
    this._estimatedCellSize = estimatedCellSize;

    // Cache of size and position data for cells, mapped by cell index.
    // Note that invalid values may exist in this map so only rely on cells up to this._lastMeasuredIndex
    this._cellSizeAndPositionData = {};

    // Measurements for cells up to this index can be trusted; cells afterward should be estimated.
    this._lastMeasuredIndex = -1;
  }

  _createClass(CellSizeAndPositionManager, [{
    key: 'configure',
    value: function configure(_ref2) {
      var cellCount = _ref2.cellCount;
      var estimatedCellSize = _ref2.estimatedCellSize;

      this._cellCount = cellCount;
      this._estimatedCellSize = estimatedCellSize;
    }
  }, {
    key: 'getCellCount',
    value: function getCellCount() {
      return this._cellCount;
    }
  }, {
    key: 'getEstimatedCellSize',
    value: function getEstimatedCellSize() {
      return this._estimatedCellSize;
    }
  }, {
    key: 'getLastMeasuredIndex',
    value: function getLastMeasuredIndex() {
      return this._lastMeasuredIndex;
    }

    /**
     * This method returns the size and position for the cell at the specified index.
     * It just-in-time calculates (or used cached values) for cells leading up to the index.
     */

  }, {
    key: 'getSizeAndPositionOfCell',
    value: function getSizeAndPositionOfCell(index) {
      if (index < 0 || index >= this._cellCount) {
        throw Error('Requested index ' + index + ' is outside of range 0..' + this._cellCount);
      }

      if (index > this._lastMeasuredIndex) {
        var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
        var _offset = lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size;

        for (var i = this._lastMeasuredIndex + 1; i <= index; i++) {
          var _size = this._cellSizeGetter({ index: i });

          if (_size == null || isNaN(_size)) {
            throw Error('Invalid size returned for cell ' + i + ' of value ' + _size);
          }

          this._cellSizeAndPositionData[i] = {
            offset: _offset,
            size: _size
          };

          _offset += _size;
        }

        this._lastMeasuredIndex = index;
      }

      return this._cellSizeAndPositionData[index];
    }
  }, {
    key: 'getSizeAndPositionOfLastMeasuredCell',
    value: function getSizeAndPositionOfLastMeasuredCell() {
      return this._lastMeasuredIndex >= 0 ? this._cellSizeAndPositionData[this._lastMeasuredIndex] : {
        offset: 0,
        size: 0
      };
    }

    /**
     * Total size of all cells being measured.
     * This value will be completedly estimated initially.
     * As cells as measured the estimate will be updated.
     */

  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();

      return lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size + (this._cellCount - this._lastMeasuredIndex - 1) * this._estimatedCellSize;
    }

    /**
     * Determines a new offset that ensures a certain cell is visible, given the current offset.
     * If the cell is already visible then the current offset will be returned.
     * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
     *
     * @param align Desired alignment within container; one of "auto" (default), "start", or "end"
     * @param containerSize Size (width or height) of the container viewport
     * @param currentOffset Container's current (x or y) offset
     * @param totalSize Total size (width or height) of all cells
     * @return Offset to use to ensure the specified cell is visible
     */

  }, {
    key: 'getUpdatedOffsetForIndex',
    value: function getUpdatedOffsetForIndex(_ref3) {
      var _ref3$align = _ref3.align;
      var align = _ref3$align === undefined ? 'auto' : _ref3$align;
      var containerSize = _ref3.containerSize;
      var currentOffset = _ref3.currentOffset;
      var targetIndex = _ref3.targetIndex;

      var datum = this.getSizeAndPositionOfCell(targetIndex);
      var maxOffset = datum.offset;
      var minOffset = maxOffset - containerSize + datum.size;

      var idealOffset = void 0;

      switch (align) {
        case 'start':
          idealOffset = maxOffset;
          break;
        case 'end':
          idealOffset = minOffset;
          break;
        case 'center':
          idealOffset = maxOffset - (containerSize - datum.size) / 2;
          break;
        default:
          idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
          break;
      }

      var totalSize = this.getTotalSize();

      return Math.max(0, Math.min(totalSize - containerSize, idealOffset));
    }
  }, {
    key: 'getVisibleCellRange',
    value: function getVisibleCellRange(_ref4) {
      var containerSize = _ref4.containerSize;
      var offset = _ref4.offset;

      var totalSize = this.getTotalSize();

      if (totalSize === 0) {
        return {};
      }

      var maxOffset = offset + containerSize;
      var start = this._findNearestCell(offset);

      var datum = this.getSizeAndPositionOfCell(start);
      offset = datum.offset + datum.size;

      var stop = start;

      while (offset < maxOffset && stop < this._cellCount - 1) {
        stop++;

        offset += this.getSizeAndPositionOfCell(stop).size;
      }

      return {
        start: start,
        stop: stop
      };
    }

    /**
     * Clear all cached values for cells after the specified index.
     * This method should be called for any cell that has changed its size.
     * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionOfCell() is called.
     */

  }, {
    key: 'resetCell',
    value: function resetCell(index) {
      this._lastMeasuredIndex = Math.min(this._lastMeasuredIndex, index - 1);
    }
  }, {
    key: '_binarySearch',
    value: function _binarySearch(_ref5) {
      var high = _ref5.high;
      var low = _ref5.low;
      var offset = _ref5.offset;

      var middle = void 0;
      var currentOffset = void 0;

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        currentOffset = this.getSizeAndPositionOfCell(middle).offset;

        if (currentOffset === offset) {
          return middle;
        } else if (currentOffset < offset) {
          low = middle + 1;
        } else if (currentOffset > offset) {
          high = middle - 1;
        }
      }

      if (low > 0) {
        return low - 1;
      }
    }
  }, {
    key: '_exponentialSearch',
    value: function _exponentialSearch(_ref6) {
      var index = _ref6.index;
      var offset = _ref6.offset;

      var interval = 1;

      while (index < this._cellCount && this.getSizeAndPositionOfCell(index).offset < offset) {
        index += interval;
        interval *= 2;
      }

      return this._binarySearch({
        high: Math.min(index, this._cellCount - 1),
        low: Math.floor(index / 2),
        offset: offset
      });
    }

    /**
     * Searches for the cell (index) nearest the specified offset.
     *
     * If no exact match is found the next lowest cell index will be returned.
     * This allows partially visible cells (with offsets just before/above the fold) to be visible.
     */

  }, {
    key: '_findNearestCell',
    value: function _findNearestCell(offset) {
      if (isNaN(offset)) {
        throw Error('Invalid offset ' + offset + ' specified');
      }

      // Our search algorithms find the nearest match at or below the specified offset.
      // So make sure the offset is at least 0 or no match will be found.
      offset = Math.max(0, offset);

      var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
      var lastMeasuredIndex = Math.max(0, this._lastMeasuredIndex);

      if (lastMeasuredCellSizeAndPosition.offset >= offset) {
        // If we've already measured cells within this range just use a binary search as it's faster.
        return this._binarySearch({
          high: lastMeasuredIndex,
          low: 0,
          offset: offset
        });
      } else {
        // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
        // The exponential search avoids pre-computing sizes for the full set of cells as a binary search would.
        // The overall complexity for this approach is O(log n).
        return this._exponentialSearch({
          index: lastMeasuredIndex,
          offset: offset
        });
      }
    }
  }]);

  return CellSizeAndPositionManager;
}();

exports.default = CellSizeAndPositionManager;
},{}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MAX_SCROLL_SIZE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CellSizeAndPositionManager = require('./CellSizeAndPositionManager');

var _CellSizeAndPositionManager2 = _interopRequireDefault(_CellSizeAndPositionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Browsers have scroll offset limitations (eg Chrome stops scrolling at ~33.5M pixels where as Edge tops out at ~1.5M pixels).
 * After a certain position, the browser won't allow the user to scroll further (even via JavaScript scroll offset adjustments).
 * This util picks a lower ceiling for max size and artificially adjusts positions within to make it transparent for users.
 */
var DEFAULT_MAX_SCROLL_SIZE = exports.DEFAULT_MAX_SCROLL_SIZE = 1500000;

/**
 * Extends CellSizeAndPositionManager and adds scaling behavior for lists that are too large to fit within a browser's native limits.
 */

var ScalingCellSizeAndPositionManager = function () {
  function ScalingCellSizeAndPositionManager(_ref) {
    var _ref$maxScrollSize = _ref.maxScrollSize;
    var maxScrollSize = _ref$maxScrollSize === undefined ? DEFAULT_MAX_SCROLL_SIZE : _ref$maxScrollSize;

    var params = _objectWithoutProperties(_ref, ['maxScrollSize']);

    _classCallCheck(this, ScalingCellSizeAndPositionManager);

    // Favor composition over inheritance to simplify IE10 support
    this._cellSizeAndPositionManager = new _CellSizeAndPositionManager2.default(params);
    this._maxScrollSize = maxScrollSize;
  }

  _createClass(ScalingCellSizeAndPositionManager, [{
    key: 'configure',
    value: function configure(params) {
      this._cellSizeAndPositionManager.configure(params);
    }
  }, {
    key: 'getCellCount',
    value: function getCellCount() {
      return this._cellSizeAndPositionManager.getCellCount();
    }
  }, {
    key: 'getEstimatedCellSize',
    value: function getEstimatedCellSize() {
      return this._cellSizeAndPositionManager.getEstimatedCellSize();
    }
  }, {
    key: 'getLastMeasuredIndex',
    value: function getLastMeasuredIndex() {
      return this._cellSizeAndPositionManager.getLastMeasuredIndex();
    }

    /**
     * Number of pixels a cell at the given position (offset) should be shifted in order to fit within the scaled container.
     * The offset passed to this function is scalled (safe) as well.
     */

  }, {
    key: 'getOffsetAdjustment',
    value: function getOffsetAdjustment(_ref2) {
      var containerSize = _ref2.containerSize;
      var offset = _ref2.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();
      var offsetPercentage = this._getOffsetPercentage({
        containerSize: containerSize,
        offset: offset,
        totalSize: safeTotalSize
      });

      return Math.round(offsetPercentage * (safeTotalSize - totalSize));
    }
  }, {
    key: 'getSizeAndPositionOfCell',
    value: function getSizeAndPositionOfCell(index) {
      return this._cellSizeAndPositionManager.getSizeAndPositionOfCell(index);
    }
  }, {
    key: 'getSizeAndPositionOfLastMeasuredCell',
    value: function getSizeAndPositionOfLastMeasuredCell() {
      return this._cellSizeAndPositionManager.getSizeAndPositionOfLastMeasuredCell();
    }

    /** See CellSizeAndPositionManager#getTotalSize */

  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return Math.min(this._maxScrollSize, this._cellSizeAndPositionManager.getTotalSize());
    }

    /** See CellSizeAndPositionManager#getUpdatedOffsetForIndex */

  }, {
    key: 'getUpdatedOffsetForIndex',
    value: function getUpdatedOffsetForIndex(_ref3) {
      var _ref3$align = _ref3.align;
      var align = _ref3$align === undefined ? 'auto' : _ref3$align;
      var containerSize = _ref3.containerSize;
      var currentOffset = _ref3.currentOffset;
      var targetIndex = _ref3.targetIndex;
      var totalSize = _ref3.totalSize;

      currentOffset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: currentOffset
      });

      var offset = this._cellSizeAndPositionManager.getUpdatedOffsetForIndex({
        align: align,
        containerSize: containerSize,
        currentOffset: currentOffset,
        targetIndex: targetIndex,
        totalSize: totalSize
      });

      return this._offsetToSafeOffset({
        containerSize: containerSize,
        offset: offset
      });
    }

    /** See CellSizeAndPositionManager#getVisibleCellRange */

  }, {
    key: 'getVisibleCellRange',
    value: function getVisibleCellRange(_ref4) {
      var containerSize = _ref4.containerSize;
      var offset = _ref4.offset;

      offset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: offset
      });

      return this._cellSizeAndPositionManager.getVisibleCellRange({
        containerSize: containerSize,
        offset: offset
      });
    }
  }, {
    key: 'resetCell',
    value: function resetCell(index) {
      this._cellSizeAndPositionManager.resetCell(index);
    }
  }, {
    key: '_getOffsetPercentage',
    value: function _getOffsetPercentage(_ref5) {
      var containerSize = _ref5.containerSize;
      var offset = _ref5.offset;
      var totalSize = _ref5.totalSize;

      return totalSize <= containerSize ? 0 : offset / (totalSize - containerSize);
    }
  }, {
    key: '_offsetToSafeOffset',
    value: function _offsetToSafeOffset(_ref6) {
      var containerSize = _ref6.containerSize;
      var offset = _ref6.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: totalSize
        });

        return Math.round(offsetPercentage * (safeTotalSize - containerSize));
      }
    }
  }, {
    key: '_safeOffsetToOffset',
    value: function _safeOffsetToOffset(_ref7) {
      var containerSize = _ref7.containerSize;
      var offset = _ref7.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: safeTotalSize
        });

        return Math.round(offsetPercentage * (totalSize - containerSize));
      }
    }
  }]);

  return ScalingCellSizeAndPositionManager;
}();

exports.default = ScalingCellSizeAndPositionManager;
},{"./CellSizeAndPositionManager":63}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionDataAndUpdateScrollOffset;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param computeMetadataCallback Method to invoke if cell metadata should be recalculated
 * @param computeMetadataCallbackProps Parameters to pass to :computeMetadataCallback
 * @param nextCellsCount Newly updated number of rows or columns in the current axis
 * @param nextCellsSize Newly updated width or height of cells for the current axis
 * @param nextScrollToIndex Newly updated scroll-to-index
 * @param scrollToIndex Scroll-to-index
 * @param updateScrollOffsetForScrollToIndex Callback to invoke if the scroll position should be recalculated
 */
function calculateSizeAndPositionDataAndUpdateScrollOffset(_ref) {
  var cellCount = _ref.cellCount;
  var cellSize = _ref.cellSize;
  var computeMetadataCallback = _ref.computeMetadataCallback;
  var computeMetadataCallbackProps = _ref.computeMetadataCallbackProps;
  var nextCellsCount = _ref.nextCellsCount;
  var nextCellSize = _ref.nextCellSize;
  var nextScrollToIndex = _ref.nextScrollToIndex;
  var scrollToIndex = _ref.scrollToIndex;
  var updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (cellCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}
},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOverscanIndices;
var SCROLL_DIRECTION_BACKWARD = exports.SCROLL_DIRECTION_BACKWARD = -1;
var SCROLL_DIRECTION_FIXED = exports.SCROLL_DIRECTION_FIXED = 0;
var SCROLL_DIRECTION_FORWARD = exports.SCROLL_DIRECTION_FORWARD = 1;

/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 *
 * @param cellCount Number of rows or columns in the current axis
 * @param scrollDirection One of SCROLL_DIRECTION_BACKWARD
 * @param overscanCellsCount Maximum number of cells to over-render in either direction
 * @param startIndex Begin of range of visible cells
 * @param stopIndex End of range of visible cells
 */
function getOverscanIndices(_ref) {
  var cellCount = _ref.cellCount;
  var overscanCellsCount = _ref.overscanCellsCount;
  var scrollDirection = _ref.scrollDirection;
  var startIndex = _ref.startIndex;
  var stopIndex = _ref.stopIndex;

  var overscanStartIndex = void 0;
  var overscanStopIndex = void 0;

  if (scrollDirection === SCROLL_DIRECTION_FORWARD) {
    overscanStartIndex = startIndex;
    overscanStopIndex = stopIndex + overscanCellsCount * 2;
  } else if (scrollDirection === SCROLL_DIRECTION_BACKWARD) {
    overscanStartIndex = startIndex - overscanCellsCount * 2;
    overscanStopIndex = stopIndex;
  } else {
    overscanStartIndex = startIndex - overscanCellsCount;
    overscanStopIndex = stopIndex + overscanCellsCount;
  }

  return {
    overscanStartIndex: Math.max(0, overscanStartIndex),
    overscanStopIndex: Math.min(cellCount - 1, overscanStopIndex)
  };
}
},{}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateScrollIndexHelper;
/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 * This function also ensures that the scroll ofset isn't past the last column/row of cells.
 *
 * @param cellsSize Width or height of cells for the current axis
 * @param cellSizeAndPositionManager Manages size and position metadata of cells
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an scroll-to-index value
 */
function updateScrollIndexHelper(_ref) {
  var cellSize = _ref.cellSize;
  var cellSizeAndPositionManager = _ref.cellSizeAndPositionManager;
  var previousCellsCount = _ref.previousCellsCount;
  var previousCellSize = _ref.previousCellSize;
  var previousScrollToAlignment = _ref.previousScrollToAlignment;
  var previousScrollToIndex = _ref.previousScrollToIndex;
  var previousSize = _ref.previousSize;
  var scrollOffset = _ref.scrollOffset;
  var scrollToAlignment = _ref.scrollToAlignment;
  var scrollToIndex = _ref.scrollToIndex;
  var size = _ref.size;
  var updateScrollIndexCallback = _ref.updateScrollIndexCallback;

  var cellCount = cellSizeAndPositionManager.getCellCount();
  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToAlignment !== previousScrollToAlignment || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
    // We need to ensure that the current scroll offset is still within the collection's range.
    // To do this, we don't need to measure everything; CellMeasurer would perform poorly.
    // Just check to make sure we're still okay.
    // Only adjust the scroll position if we've scrolled below the last set of rows.
    if (scrollOffset > cellSizeAndPositionManager.getTotalSize() - size) {
      updateScrollIndexCallback(cellCount - 1);
    }
  }
}
},{}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isRangeVisible = isRangeVisible;
exports.scanForUnloadedRanges = scanForUnloadedRanges;
exports.forceUpdateReactVirtualizedComponent = forceUpdateReactVirtualizedComponent;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher-order component that manages lazy-loading for "infinite" data.
 * This component decorates a virtual component and just-in-time prefetches rows as a user scrolls.
 * It is intended as a convenience component; fork it if you'd like finer-grained control over data-loading.
 */
var InfiniteLoader = function (_Component) {
  _inherits(InfiniteLoader, _Component);

  function InfiniteLoader(props, context) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, (InfiniteLoader.__proto__ || Object.getPrototypeOf(InfiniteLoader)).call(this, props, context));

    _this._loadMoreRowsMemoizer = (0, _createCallbackMemoizer2.default)();

    _this._onRowsRendered = _this._onRowsRendered.bind(_this);
    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        onRowsRendered: this._onRowsRendered,
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_loadUnloadedRanges',
    value: function _loadUnloadedRanges(unloadedRanges) {
      var _this2 = this;

      var loadMoreRows = this.props.loadMoreRows;


      unloadedRanges.forEach(function (unloadedRange) {
        var promise = loadMoreRows(unloadedRange);
        if (promise) {
          promise.then(function () {
            // Refresh the visible rows if any of them have just been loaded.
            // Otherwise they will remain in their unloaded visual state.
            if (isRangeVisible({
              lastRenderedStartIndex: _this2._lastRenderedStartIndex,
              lastRenderedStopIndex: _this2._lastRenderedStopIndex,
              startIndex: unloadedRange.startIndex,
              stopIndex: unloadedRange.stopIndex
            })) {
              if (_this2._registeredChild) {
                forceUpdateReactVirtualizedComponent(_this2._registeredChild);
              }
            }
          });
        }
      });
    }
  }, {
    key: '_onRowsRendered',
    value: function _onRowsRendered(_ref) {
      var _this3 = this;

      var startIndex = _ref.startIndex;
      var stopIndex = _ref.stopIndex;
      var _props = this.props;
      var isRowLoaded = _props.isRowLoaded;
      var minimumBatchSize = _props.minimumBatchSize;
      var rowCount = _props.rowCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        minimumBatchSize: minimumBatchSize,
        rowCount: rowCount,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowCount - 1, stopIndex + threshold)
      });

      // For memoize comparison
      var squashedUnloadedRanges = unloadedRanges.reduce(function (reduced, unloadedRange) {
        return reduced.concat([unloadedRange.startIndex, unloadedRange.stopIndex]);
      }, []);

      this._loadMoreRowsMemoizer({
        callback: function callback() {
          _this3._loadUnloadedRanges(unloadedRanges);
        },
        indices: { squashedUnloadedRanges: squashedUnloadedRanges }
      });
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(registeredChild) {
      this._registeredChild = registeredChild;
    }
  }]);

  return InfiniteLoader;
}(_react.Component);

/**
 * Determines if the specified start/stop range is visible based on the most recently rendered range.
 */


InfiniteLoader.propTypes = {
  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ onRowsRendered, registerChild }) => PropTypes.element
   *
   * The specified :onRowsRendered function should be passed through to the child's :onRowsRendered property.
   * The :registerChild callback should be set as the virtualized component's :ref.
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Function responsible for tracking the loaded state of each row.
   * It should implement the following signature: ({ index: number }): boolean
   */
  isRowLoaded: _react.PropTypes.func.isRequired,

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should implement the following signature: ({ startIndex, stopIndex }): Promise
   * The returned Promise should be resolved once row data has finished loading.
   * It will be used to determine when to refresh the list with the newly-loaded data.
   * This callback may be called multiple times in reaction to a single scroll event.
   */
  loadMoreRows: _react.PropTypes.func.isRequired,

  /**
   * Minimum number of rows to be loaded at a time.
   * This property can be used to batch requests to reduce HTTP requests.
   */
  minimumBatchSize: _react.PropTypes.number.isRequired,

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowCount: _react.PropTypes.number.isRequired,

  /**
   * Threshold at which to pre-fetch data.
   * A threshold X means that data will start loading when a user scrolls within X rows.
   * This value defaults to 15.
   */
  threshold: _react.PropTypes.number.isRequired
};
InfiniteLoader.defaultProps = {
  minimumBatchSize: 10,
  rowCount: 0,
  threshold: 15
};
exports.default = InfiniteLoader;
function isRangeVisible(_ref2) {
  var lastRenderedStartIndex = _ref2.lastRenderedStartIndex;
  var lastRenderedStopIndex = _ref2.lastRenderedStopIndex;
  var startIndex = _ref2.startIndex;
  var stopIndex = _ref2.stopIndex;

  return !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);
}

/**
 * Returns all of the ranges within a larger range that contain unloaded rows.
 */
function scanForUnloadedRanges(_ref3) {
  var isRowLoaded = _ref3.isRowLoaded;
  var minimumBatchSize = _ref3.minimumBatchSize;
  var rowCount = _ref3.rowCount;
  var startIndex = _ref3.startIndex;
  var stopIndex = _ref3.stopIndex;

  var unloadedRanges = [];

  var rangeStartIndex = null;
  var rangeStopIndex = null;

  for (var index = startIndex; index <= stopIndex; index++) {
    var loaded = isRowLoaded({ index: index });

    if (!loaded) {
      rangeStopIndex = index;
      if (rangeStartIndex === null) {
        rangeStartIndex = index;
      }
    } else if (rangeStopIndex !== null) {
      unloadedRanges.push({
        startIndex: rangeStartIndex,
        stopIndex: rangeStopIndex
      });

      rangeStartIndex = rangeStopIndex = null;
    }
  }

  // If :rangeStopIndex is not null it means we haven't ran out of unloaded rows.
  // Scan forward to try filling our :minimumBatchSize.
  if (rangeStopIndex !== null) {
    var potentialStopIndex = Math.min(Math.max(rangeStopIndex, rangeStartIndex + minimumBatchSize - 1), rowCount - 1);

    for (var _index = rangeStopIndex + 1; _index <= potentialStopIndex; _index++) {
      if (!isRowLoaded({ index: _index })) {
        rangeStopIndex = _index;
      } else {
        break;
      }
    }

    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  // Check to see if our first range ended prematurely.
  // In this case we should scan backwards to try filling our :minimumBatchSize.
  if (unloadedRanges.length) {
    var firstUnloadedRange = unloadedRanges[0];

    while (firstUnloadedRange.stopIndex - firstUnloadedRange.startIndex + 1 < minimumBatchSize && firstUnloadedRange.startIndex > 0) {
      var _index2 = firstUnloadedRange.startIndex - 1;

      if (!isRowLoaded({ index: _index2 })) {
        firstUnloadedRange.startIndex = _index2;
      } else {
        break;
      }
    }
  }

  return unloadedRanges;
}

/**
 * Since RV components use shallowCompare we need to force a render (even though props haven't changed).
 * However InfiniteLoader may wrap a Grid or it may wrap a FlexTable or VirtualScroll.
 * In the first case the built-in React forceUpdate() method is sufficient to force a re-render,
 * But in the latter cases we need to use the RV-specific forceUpdateGrid() method.
 * Else the inner Grid will not be re-rendered and visuals may be stale.
 */
function forceUpdateReactVirtualizedComponent(component) {
  typeof component.forceUpdateGrid === 'function' ? component.forceUpdateGrid() : component.forceUpdate();
}
},{"../utils/createCallbackMemoizer":78,"react":undefined,"react-addons-shallow-compare":30}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteLoader = exports.default = undefined;

var _InfiniteLoader2 = require('./InfiniteLoader');

var _InfiniteLoader3 = _interopRequireDefault(_InfiniteLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InfiniteLoader3.default;
exports.InfiniteLoader = _InfiniteLoader3.default;
},{"./InfiniteLoader":68}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */
var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, (ScrollSync.__proto__ || Object.getPrototypeOf(ScrollSync)).call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollSync, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var clientHeight = _state.clientHeight;
      var clientWidth = _state.clientWidth;
      var scrollHeight = _state.scrollHeight;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;
      var scrollWidth = _state.scrollWidth;


      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight;
      var clientWidth = _ref.clientWidth;
      var scrollHeight = _ref.scrollHeight;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var scrollWidth = _ref.scrollWidth;

      this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
    }
  }]);

  return ScrollSync;
}(_react.Component);

ScrollSync.propTypes = {
  /**
   * Function respondible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
};
exports.default = ScrollSync;
},{"react":undefined,"react-addons-shallow-compare":30}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSync = exports.default = undefined;

var _ScrollSync2 = require('./ScrollSync');

var _ScrollSync3 = _interopRequireDefault(_ScrollSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollSync3.default;
exports.ScrollSync = _ScrollSync3.default;
},{"./ScrollSync":70}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */
var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll(props, context) {
    _classCallCheck(this, VirtualScroll);

    var _this = _possibleConstructorReturn(this, (VirtualScroll.__proto__ || Object.getPrototypeOf(VirtualScroll)).call(this, props, context));

    _this._cellRenderer = _this._cellRenderer.bind(_this);
    _this._createRowClassNameGetter = _this._createRowClassNameGetter.bind(_this);
    _this._createRowStyleGetter = _this._createRowStyleGetter.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(VirtualScroll, [{
    key: 'forceUpdateGrid',
    value: function forceUpdateGrid() {
      this.Grid.forceUpdate();
    }

    /** See Grid#measureAllCells */

  }, {
    key: 'measureAllRows',
    value: function measureAllRows() {
      this.Grid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */

  }, {
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this.Grid.recomputeGridSize({
        rowIndex: index
      });
      this.forceUpdateGrid();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var noRowsRenderer = _props.noRowsRenderer;
      var scrollToIndex = _props.scrollToIndex;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, _extends({}, this.props, {
        autoContainerWidth: true,
        cellRenderer: this._cellRenderer,
        cellClassName: this._createRowClassNameGetter(),
        cellStyle: this._createRowStyleGetter(),
        className: classNames,
        columnWidth: width,
        columnCount: 1,
        noContentRenderer: noRowsRenderer,
        onScroll: this._onScroll,
        onSectionRendered: this._onSectionRendered,
        ref: function ref(_ref) {
          _this2.Grid = _ref;
        },
        scrollToRow: scrollToIndex
      }));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_cellRenderer',
    value: function _cellRenderer(_ref2) {
      var columnIndex = _ref2.columnIndex;
      var isScrolling = _ref2.isScrolling;
      var rowIndex = _ref2.rowIndex;
      var rowRenderer = this.props.rowRenderer;


      return rowRenderer({
        index: rowIndex,
        isScrolling: isScrolling
      });
    }
  }, {
    key: '_createRowClassNameGetter',
    value: function _createRowClassNameGetter() {
      var rowClassName = this.props.rowClassName;


      return rowClassName instanceof Function ? function (_ref3) {
        var rowIndex = _ref3.rowIndex;
        return rowClassName({ index: rowIndex });
      } : function () {
        return rowClassName;
      };
    }
  }, {
    key: '_createRowStyleGetter',
    value: function _createRowStyleGetter() {
      var rowStyle = this.props.rowStyle;


      var wrapped = rowStyle instanceof Function ? rowStyle : function () {
        return rowStyle;
      };

      // Default width to 100% to prevent list rows from flowing under the vertical scrollbar
      return function (_ref4) {
        var rowIndex = _ref4.rowIndex;
        return _extends({
          width: '100%'
        }, wrapped({ index: rowIndex }));
      };
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref5) {
      var clientHeight = _ref5.clientHeight;
      var scrollHeight = _ref5.scrollHeight;
      var scrollTop = _ref5.scrollTop;
      var onScroll = this.props.onScroll;


      onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref6) {
      var rowOverscanStartIndex = _ref6.rowOverscanStartIndex;
      var rowOverscanStopIndex = _ref6.rowOverscanStopIndex;
      var rowStartIndex = _ref6.rowStartIndex;
      var rowStopIndex = _ref6.rowStopIndex;
      var onRowsRendered = this.props.onRowsRendered;


      onRowsRendered({
        overscanStartIndex: rowOverscanStartIndex,
        overscanStopIndex: rowOverscanStopIndex,
        startIndex: rowStartIndex,
        stopIndex: rowStopIndex
      });
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight: _react.PropTypes.bool,

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /**
   * Used to estimate the total height of a VirtualScroll before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: _react.PropTypes.number.isRequired,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * ({ index: number }): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index; ({ index: number }): node */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Optional custom CSS class for individual rows */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /** Number of rows in list. */
  rowCount: _react.PropTypes.number.isRequired,

  /** Optional custom styles for individual cells */
  rowStyle: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

  /** See Grid#scrollToAlignment */
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Optional inline style */
  style: _react.PropTypes.object,

  /** Tab index for focus */
  tabIndex: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  estimatedRowSize: 30,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowCount: 10,
  scrollToAlignment: 'auto',
  style: {}
};
exports.default = VirtualScroll;
},{"../Grid":62,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":30}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualScroll = exports.default = undefined;

var _VirtualScroll2 = require('./VirtualScroll');

var _VirtualScroll3 = _interopRequireDefault(_VirtualScroll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualScroll3.default;
exports.VirtualScroll = _VirtualScroll3.default;
},{"./VirtualScroll":72}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _onScroll = require('./utils/onScroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowScroller = function (_Component) {
  _inherits(WindowScroller, _Component);

  function WindowScroller(props) {
    _classCallCheck(this, WindowScroller);

    var _this = _possibleConstructorReturn(this, (WindowScroller.__proto__ || Object.getPrototypeOf(WindowScroller)).call(this, props));

    var height = typeof window !== 'undefined' ? window.innerHeight : 0;

    _this.state = {
      isScrolling: false,
      height: height,
      scrollTop: 0
    };

    _this._onScrollWindow = _this._onScrollWindow.bind(_this);
    _this._onResizeWindow = _this._onResizeWindow.bind(_this);
    _this._enablePointerEventsAfterDelayCallback = _this._enablePointerEventsAfterDelayCallback.bind(_this);
    return _this;
  }

  _createClass(WindowScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = this.state.height;

      // Subtract documentElement top to handle edge-case where a user is navigating back (history) from an already-scrolled bage.
      // In this case the body's top position will be a negative number and this element's top will be increased (by that amount).

      this._positionFromTop = _reactDom2.default.findDOMNode(this).getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;

      if (height !== window.innerHeight) {
        this.setState({
          height: window.innerHeight
        });
      }

      (0, _onScroll.registerScrollListener)(this);
      window.addEventListener('resize', this._onResizeWindow, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _onScroll.unregisterScrollListener)(this);

      window.removeEventListener('resize', this._onResizeWindow, false);
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this2 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this2._setNextStateAnimationFrameId = null;
        _this2.setState(state);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var isScrolling = _state.isScrolling;
      var scrollTop = _state.scrollTop;
      var height = _state.height;


      return _react2.default.createElement(
        'div',
        null,
        children({
          height: height,
          isScrolling: isScrolling,
          scrollTop: scrollTop
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_enablePointerEventsAfterDelayCallback',
    value: function _enablePointerEventsAfterDelayCallback() {
      this.setState({
        isScrolling: false
      });
    }
  }, {
    key: '_onResizeWindow',
    value: function _onResizeWindow(event) {
      var onResize = this.props.onResize;


      var height = window.innerHeight || 0;

      this.setState({ height: height });

      onResize({ height: height });
    }
  }, {
    key: '_onScrollWindow',
    value: function _onScrollWindow(event) {
      var onScroll = this.props.onScroll;

      // In IE10+ scrollY is undefined, so we replace that with the latter

      var scrollY = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop;

      var scrollTop = Math.max(0, scrollY - this._positionFromTop);

      var state = {
        isScrolling: true,
        scrollTop: scrollTop
      };

      if (!this.state.isScrolling) {
        this.setState(state);
      } else {
        this._setNextState(state);
      }

      onScroll({ scrollTop: scrollTop });
    }
  }]);

  return WindowScroller;
}(_react.Component);

WindowScroller.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: _react.PropTypes.func.isRequired
};
WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
exports.default = WindowScroller;
},{"./utils/onScroll":76,"raf":29,"react":undefined,"react-addons-shallow-compare":30,"react-dom":undefined}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_SCROLLING_TIMEOUT = exports.WindowScroller = exports.default = undefined;

var _WindowScroller2 = require('./WindowScroller');

var _WindowScroller3 = _interopRequireDefault(_WindowScroller2);

var _onScroll = require('./utils/onScroll');

var _onScroll2 = _interopRequireDefault(_onScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _WindowScroller3.default;
exports.WindowScroller = _WindowScroller3.default;
exports.IS_SCROLLING_TIMEOUT = _onScroll2.default;
},{"./WindowScroller":74,"./utils/onScroll":76}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerScrollListener = registerScrollListener;
exports.unregisterScrollListener = unregisterScrollListener;
var mountedInstances = [];
var originalBodyPointerEvents = null;
var disablePointerEventsTimeoutId = null;

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = exports.IS_SCROLLING_TIMEOUT = 150;

function enablePointerEventsIfDisabled() {
  if (disablePointerEventsTimeoutId) {
    disablePointerEventsTimeoutId = null;

    document.body.style.pointerEvents = originalBodyPointerEvents;

    originalBodyPointerEvents = null;
  }
}

function enablePointerEventsAfterDelayCallback() {
  enablePointerEventsIfDisabled();
  mountedInstances.forEach(function (component) {
    return component._enablePointerEventsAfterDelayCallback();
  });
}

function enablePointerEventsAfterDelay() {
  if (disablePointerEventsTimeoutId) {
    clearTimeout(disablePointerEventsTimeoutId);
  }

  disablePointerEventsTimeoutId = setTimeout(enablePointerEventsAfterDelayCallback, IS_SCROLLING_TIMEOUT);
}

function onScrollWindow(event) {
  if (originalBodyPointerEvents == null) {
    originalBodyPointerEvents = document.body.style.pointerEvents;

    document.body.style.pointerEvents = 'none';

    enablePointerEventsAfterDelay();
  }
  mountedInstances.forEach(function (component) {
    return component._onScrollWindow(event);
  });
}

function registerScrollListener(component) {
  if (!mountedInstances.length) {
    window.addEventListener('scroll', onScrollWindow);
  }
  mountedInstances.push(component);
}

function unregisterScrollListener(component) {
  mountedInstances = mountedInstances.filter(function (c) {
    return c !== component;
  });
  if (!mountedInstances.length) {
    window.removeEventListener('scroll', onScrollWindow);
    if (disablePointerEventsTimeoutId) {
      clearTimeout(disablePointerEventsTimeoutId);
      enablePointerEventsIfDisabled();
    }
  }
}
},{}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrowKeyStepper = require('./ArrowKeyStepper');

Object.defineProperty(exports, 'ArrowKeyStepper', {
  enumerable: true,
  get: function get() {
    return _ArrowKeyStepper.ArrowKeyStepper;
  }
});

var _AutoSizer = require('./AutoSizer');

Object.defineProperty(exports, 'AutoSizer', {
  enumerable: true,
  get: function get() {
    return _AutoSizer.AutoSizer;
  }
});

var _CellMeasurer = require('./CellMeasurer');

Object.defineProperty(exports, 'CellMeasurer', {
  enumerable: true,
  get: function get() {
    return _CellMeasurer.CellMeasurer;
  }
});
Object.defineProperty(exports, 'defaultCellMeasurerCellSizeCache', {
  enumerable: true,
  get: function get() {
    return _CellMeasurer.defaultCellSizeCache;
  }
});
Object.defineProperty(exports, 'uniformSizeCellMeasurerCellSizeCache', {
  enumerable: true,
  get: function get() {
    return _CellMeasurer.defaultCellSizeCache;
  }
});

var _Collection = require('./Collection');

Object.defineProperty(exports, 'Collection', {
  enumerable: true,
  get: function get() {
    return _Collection.Collection;
  }
});

var _ColumnSizer = require('./ColumnSizer');

Object.defineProperty(exports, 'ColumnSizer', {
  enumerable: true,
  get: function get() {
    return _ColumnSizer.ColumnSizer;
  }
});

var _FlexTable = require('./FlexTable');

Object.defineProperty(exports, 'defaultFlexTableCellDataGetter', {
  enumerable: true,
  get: function get() {
    return _FlexTable.defaultCellDataGetter;
  }
});
Object.defineProperty(exports, 'defaultFlexTableCellRenderer', {
  enumerable: true,
  get: function get() {
    return _FlexTable.defaultCellRenderer;
  }
});
Object.defineProperty(exports, 'defaultFlexTableHeaderRenderer', {
  enumerable: true,
  get: function get() {
    return _FlexTable.defaultHeaderRenderer;
  }
});
Object.defineProperty(exports, 'defaultFlexTableRowRenderer', {
  enumerable: true,
  get: function get() {
    return _FlexTable.defaultRowRenderer;
  }
});
Object.defineProperty(exports, 'FlexTable', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexTable;
  }
});
Object.defineProperty(exports, 'FlexColumn', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexColumn;
  }
});
Object.defineProperty(exports, 'SortDirection', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortDirection;
  }
});
Object.defineProperty(exports, 'SortIndicator', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortIndicator;
  }
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'defaultCellRangeRenderer', {
  enumerable: true,
  get: function get() {
    return _Grid.defaultCellRangeRenderer;
  }
});
Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _Grid.Grid;
  }
});

var _InfiniteLoader = require('./InfiniteLoader');

Object.defineProperty(exports, 'InfiniteLoader', {
  enumerable: true,
  get: function get() {
    return _InfiniteLoader.InfiniteLoader;
  }
});

var _ScrollSync = require('./ScrollSync');

Object.defineProperty(exports, 'ScrollSync', {
  enumerable: true,
  get: function get() {
    return _ScrollSync.ScrollSync;
  }
});

var _VirtualScroll = require('./VirtualScroll');

Object.defineProperty(exports, 'VirtualScroll', {
  enumerable: true,
  get: function get() {
    return _VirtualScroll.VirtualScroll;
  }
});

var _WindowScroller = require('./WindowScroller');

Object.defineProperty(exports, 'WindowScroller', {
  enumerable: true,
  get: function get() {
    return _WindowScroller.WindowScroller;
  }
});
},{"./ArrowKeyStepper":37,"./AutoSizer":39,"./CellMeasurer":42,"./Collection":47,"./ColumnSizer":50,"./FlexTable":59,"./Grid":62,"./InfiniteLoader":69,"./ScrollSync":71,"./VirtualScroll":73,"./WindowScroller":75}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCallbackMemoizer;
/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref) {
    var callback = _ref.callback;
    var indices = _ref.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      var value = indices[key];
      return Array.isArray(value) ? value.length > 0 : value >= 0;
    });
    var indexChanged = keys.length !== Object.keys(cachedIndices).length || keys.some(function (key) {
      var cachedValue = cachedIndices[key];
      var value = indices[key];

      return Array.isArray(value) ? cachedValue.join(',') !== value.join(',') : cachedValue !== value;
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}
},{}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUpdatedOffsetForIndex;
/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param align Desired alignment within container; one of "auto" (default), "start", or "end"
 * @param cellOffset Offset (x or y) position for cell
 * @param cellSize Size (width or height) of cell
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref) {
  var _ref$align = _ref.align;
  var align = _ref$align === undefined ? 'auto' : _ref$align;
  var cellOffset = _ref.cellOffset;
  var cellSize = _ref.cellSize;
  var containerSize = _ref.containerSize;
  var currentOffset = _ref.currentOffset;

  var maxOffset = cellOffset;
  var minOffset = maxOffset - containerSize + cellSize;

  switch (align) {
    case 'start':
      return maxOffset;
    case 'end':
      return minOffset;
    case 'center':
      return maxOffset - (containerSize - cellSize) / 2;
    default:
      return Math.max(minOffset, Math.min(maxOffset, currentOffset));
  }
}
},{}],80:[function(require,module,exports){
'use strict';

/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
var _window;
if (typeof window !== 'undefined') {
  _window = window;
} else if (typeof self !== 'undefined') {
  _window = self;
} else {
  _window = undefined;
}

var attachEvent = typeof document !== 'undefined' && document.attachEvent;
var stylesCreated = false;

if (!attachEvent) {
  var requestFrame = function () {
    var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
      return _window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  var resetTriggers = function resetTriggers(element) {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };

  var checkTriggers = function checkTriggers(element) {
    return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
  };

  var scrollListener = function scrollListener(e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  };

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

var createStyles = function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  if (attachEvent) element.attachEvent('onresize', fn);else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) element.detachEvent('onresize', fn);else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener, true);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

module.exports = {
  addResizeListener: addResizeListener,
  removeResizeListener: removeResizeListener
};
},{}],81:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

},{}],82:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2ltb25tYWRzZW4vRGVza3RvcC9tZS9naXRodWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvVXNlcnMvc2ltb25tYWRzZW4vRGVza3RvcC9tZS9naXRodWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0Jvb2xlYW5TZWxlY3QuanMiLCIvVXNlcnMvc2ltb25tYWRzZW4vRGVza3RvcC9tZS9naXRodWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy9zaW1vbm1hZHNlbi9EZXNrdG9wL21lL2dpdGh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3JlYXRhYmxlLmpzIiwiL1VzZXJzL3NpbW9ubWFkc2VuL0Rlc2t0b3AvbWUvZ2l0aHViL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21Db21wb25lbnRzLmpzIiwiL1VzZXJzL3NpbW9ubWFkc2VuL0Rlc2t0b3AvbWUvZ2l0aHViL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21SZW5kZXIuanMiLCIvVXNlcnMvc2ltb25tYWRzZW4vRGVza3RvcC9tZS9naXRodWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0dpdGh1YlVzZXJzLmpzIiwiL1VzZXJzL3NpbW9ubWFkc2VuL0Rlc2t0b3AvbWUvZ2l0aHViL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9NdWx0aXNlbGVjdC5qcyIsIi9Vc2Vycy9zaW1vbm1hZHNlbi9EZXNrdG9wL21lL2dpdGh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdC5qcyIsIi9Vc2Vycy9zaW1vbm1hZHNlbi9EZXNrdG9wL21lL2dpdGh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvU3RhdGVzLmpzIiwiL1VzZXJzL3NpbW9ubWFkc2VuL0Rlc2t0b3AvbWUvZ2l0aHViL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9WaXJ0dWFsaXplZC5qcyIsIi9Vc2Vycy9zaW1vbm1hZHNlbi9EZXNrdG9wL21lL2dpdGh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvY2l0aWVzLmpzIiwiL1VzZXJzL3NpbW9ubWFkc2VuL0Rlc2t0b3AvbWUvZ2l0aHViL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9jb250cmlidXRvcnMuanMiLCIvVXNlcnMvc2ltb25tYWRzZW4vRGVza3RvcC9tZS9naXRodWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL3N0YXRlcy5qcyIsIi9Vc2Vycy9zaW1vbm1hZHNlbi9EZXNrdG9wL21lL2dpdGh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvdXNlcnMuanMiLCJub2RlX21vZHVsZXMvY2hhcmVuYy9jaGFyZW5jLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0L2NyeXB0LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL3V0aWwvaW5ET00uanMiLCJub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3NoYWxsb3dFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXMtcmV0aW5hL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtZmV0Y2gvZmV0Y2gtbnBtLWJyb3dzZXJpZnkuanMiLCJub2RlX21vZHVsZXMvbWQ1L21kNS5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZvcm1hbmNlLW5vdy9saWIvcGVyZm9ybWFuY2Utbm93LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFmL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtZ3JhdmF0YXIvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1oaWdobGlnaHQtd29yZHMvZGlzdC9tYWluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxpemVkU2VsZWN0L1ZpcnR1YWxpemVkU2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxpemVkU2VsZWN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL0Fycm93S2V5U3RlcHBlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0Fycm93S2V5U3RlcHBlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9BdXRvU2l6ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BdXRvU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9DZWxsTWVhc3VyZXIvQ2VsbE1lYXN1cmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ2VsbE1lYXN1cmVyL2RlZmF1bHRDZWxsU2l6ZUNhY2hlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ2VsbE1lYXN1cmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi9Db2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi9Db2xsZWN0aW9uVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vU2VjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vU2VjdGlvbk1hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi91dGlscy9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sdW1uU2l6ZXIvQ29sdW1uU2l6ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2x1bW5TaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9GbGV4Q29sdW1uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL0ZsZXhUYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9Tb3J0RGlyZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL1NvcnRJbmRpY2F0b3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvZGVmYXVsdENlbGxEYXRhR2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2RlZmF1bHRDZWxsUmVuZGVyZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvZGVmYXVsdEhlYWRlclJlbmRlcmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2RlZmF1bHRSb3dSZW5kZXJlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvZGVmYXVsdENlbGxSYW5nZVJlbmRlcmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL3V0aWxzL1NjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvZ2V0T3ZlcnNjYW5JbmRpY2VzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC91dGlscy91cGRhdGVTY3JvbGxJbmRleEhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0luZmluaXRlTG9hZGVyL0luZmluaXRlTG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvSW5maW5pdGVMb2FkZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9TY3JvbGxTeW5jL1Njcm9sbFN5bmMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9TY3JvbGxTeW5jL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvVmlydHVhbFNjcm9sbC9WaXJ0dWFsU2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvVmlydHVhbFNjcm9sbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1dpbmRvd1Njcm9sbGVyL1dpbmRvd1Njcm9sbGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvV2luZG93U2Nyb2xsZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9XaW5kb3dTY3JvbGxlci91dGlscy9vblNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvdXRpbHMvY3JlYXRlQ2FsbGJhY2tNZW1vaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL3V0aWxzL2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL3ZlbmRvci9kZXRlY3RFbGVtZW50UmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9mZXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztxQkNFa0IsT0FBTzs7Ozt3QkFDSixXQUFXOzs7OzJCQUNiLGNBQWM7Ozs7bUNBRVgsd0JBQXdCOzs7O3NDQUNyQiwyQkFBMkI7Ozs7cUNBQzVCLDBCQUEwQjs7OzswQ0FDckIsK0JBQStCOzs7O3NDQUNuQywyQkFBMkI7Ozs7cUNBQzVCLDBCQUEwQjs7Ozt1Q0FDeEIsNEJBQTRCOzs7O3VDQUM1Qiw0QkFBNEI7Ozs7cUNBQzlCLDBCQUEwQjs7OztnQ0FDL0IscUJBQXFCOzs7O0FBRXhDLHNCQUFTLE1BQU0sQ0FDZDs7O0NBQ0M7QUFDQyxNQUFJLEVBQUMsd0RBQXVEO0FBQzVELE9BQUssRUFBQyxxQkFBcUI7R0FDMUI7Q0FDRyxFQUNOLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ2xDLENBQUM7Ozs7Ozs7cUJDekJnQixPQUFPOzs7O2dDQUNELG9CQUFvQjs7Ozt5QkFDdEIsWUFBWTs7OzsyQkFDZixjQUFjOzs7O0FBRWpDLElBQUkscUJBQXFCLEdBQUcsbUNBQVk7QUFDdkMsWUFBVyxFQUFFLHVCQUF1QjtBQUNwQyxVQUFTLEVBQUU7QUFDVixPQUFLLEVBQUUsdUJBQVUsTUFBTTtFQUN2QjtBQUNELGdCQUFlLEVBQUMsMkJBQUc7QUFDbEIs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SUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJ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RSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxFQUN2QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFB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LElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixF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WSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEVBQy9CLEVBQUUsSUFBSSxFQUFFLFdB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QUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxFQUM5QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFLEVBQ3hELEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFDMUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDckMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUN4QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFLEVBQ2xELEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQ3RDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQ3JDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQ3RDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDeEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFDdEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUN4QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUNwQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUN2QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUNuQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUNwQyxDQUFDOzs7OztBQ3ZFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQ2hCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUNyRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDckUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQ3JFLENBQUM7OztBQ0pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNscUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IENyZWF0YWJsZSBmcm9tICcuL2NvbXBvbmVudHMvQ3JlYXRhYmxlJztcbmltcG9ydCBDb250cmlidXRvcnMgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycyc7XG5pbXBvcnQgR2l0aHViVXNlcnMgZnJvbSAnLi9jb21wb25lbnRzL0dpdGh1YlVzZXJzJztcbmltcG9ydCBDdXN0b21Db21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21Db21wb25lbnRzJztcbmltcG9ydCBDdXN0b21SZW5kZXIgZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVJlbmRlcic7XG5pbXBvcnQgTXVsdGlzZWxlY3QgZnJvbSAnLi9jb21wb25lbnRzL011bHRpc2VsZWN0JztcbmltcG9ydCBOdW1lcmljU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9OdW1lcmljU2VsZWN0JztcbmltcG9ydCBCb29sZWFuU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9Cb29sZWFuU2VsZWN0JztcbmltcG9ydCBWaXJ0dWFsaXplZCBmcm9tICcuL2NvbXBvbmVudHMvVmlydHVhbGl6ZWQnO1xuaW1wb3J0IFN0YXRlcyBmcm9tICcuL2NvbXBvbmVudHMvU3RhdGVzJztcblxuUmVhY3RET00ucmVuZGVyKFxuXHQ8ZGl2PlxuXHRcdDxDcmVhdGFibGVcblx0XHRcdGhpbnQ9XCJFbnRlciBhIHZhbHVlIHRoYXQncyBOT1QgaW4gdGhlIGxpc3QsIHRoZW4gaGl0IHJldHVyblwiXG5cdFx0XHRsYWJlbD1cIkN1c3RvbSB0YWcgY3JlYXRpb25cIlxuXHRcdC8+XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAnY3JlYXRlLXJlYWN0LWNsYXNzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbnZhciBWYWx1ZXNBc0Jvb2xlYW5zRmllbGQgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnVmFsdWVzQXNCb29sZWFuc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1llcycgfSxcblx0XHRcdFx0eyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnTm8nIH1cblx0XHRcdF0sXG5cdFx0XHR2YWx1ZTogbnVsbFxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdCb29sZWFuIFNlbGVjdCB2YWx1ZSBjaGFuZ2VkIHRvJywgdmFsdWUpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9XG5cdFx0XHRcdFx0c2ltcGxlVmFsdWVcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgdXNlcyBzaW1wbGUgYm9vbGVhbiB2YWx1ZXM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlc0FzQm9vbGVhbnNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAnY3JlYXRlLXJlYWN0LWNsYXNzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IENPTlRSSUJVVE9SUyA9IHJlcXVpcmUoJy4uL2RhdGEvY29udHJpYnV0b3JzJyk7XG5jb25zdCBNQVhfQ09OVFJJQlVUT1JTID0gNjtcbmNvbnN0IEFTWU5DX0RFTEFZID0gNTAwO1xuXG5jb25zdCBDb250cmlidXRvcnMgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ29udHJpYnV0b3JzJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFtDT05UUklCVVRPUlNbMF1dLFxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWVbMF0sXG5cdFx0fSk7XG5cdH0sXG5cdGdldENvbnRyaWJ1dG9ycyAoaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuXHRcdHZhciBvcHRpb25zID0gQ09OVFJJQlVUT1JTLmZpbHRlcihpID0+IHtcblx0XHRcdHJldHVybiBpLmdpdGh1Yi5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoKSA9PT0gaW5wdXQ7XG5cdFx0fSk7XG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLnNsaWNlKDAsIE1BWF9DT05UUklCVVRPUlMpLFxuXHRcdFx0Y29tcGxldGU6IG9wdGlvbnMubGVuZ3RoIDw9IE1BWF9DT05UUklCVVRPUlMsXG5cdFx0fTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0fSwgQVNZTkNfREVMQVkpO1xuXHR9LFxuXHRnb3RvQ29udHJpYnV0b3IgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vJyArIHZhbHVlLmdpdGh1Yik7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdC5Bc3luYyBtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvblZhbHVlQ2xpY2s9e3RoaXMuZ290b0NvbnRyaWJ1dG9yfSB2YWx1ZUtleT1cImdpdGh1YlwiIGxhYmVsS2V5PVwibmFtZVwiIGxvYWRPcHRpb25zPXt0aGlzLmdldENvbnRyaWJ1dG9yc30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIGxhYmVsIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLCBhc3luYyBvcHRpb25zIGFuZCBvcGVucyB0aGUgZ2l0aHViIHByb2ZpbGVzIGluIGEgbmV3IHdpbmRvdyB3aGVuIHZhbHVlcyBhcmUgY2xpY2tlZDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJpYnV0b3JzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIENyZWF0YWJsZURlbW8gPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ3JlYXRhYmxlRGVtbycsXG5cdHByb3BUeXBlczoge1xuXHRcdGhpbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0XHRtdWx0aVZhbHVlOiBbXSxcblx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0eyB2YWx1ZTogJ1InLCBsYWJlbDogJ1JlZCcgfSxcblx0XHRcdFx0eyB2YWx1ZTogJ0cnLCBsYWJlbDogJ0dyZWVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAnQicsIGxhYmVsOiAnQmx1ZScgfVxuXHRcdFx0XSxcblx0XHRcdHZhbHVlOiB1bmRlZmluZWRcblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVPbkNoYW5nZSAodmFsdWUpIHtcblx0XHRjb25zdCB7IG11bHRpIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmIChtdWx0aSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IG11bHRpVmFsdWU6IHZhbHVlIH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHsgbXVsdGksIG11bHRpVmFsdWUsIG9wdGlvbnMsIHZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QuQ3JlYXRhYmxlXG5cdFx0XHRcdFx0bXVsdGk9e211bHRpfVxuXHRcdFx0XHRcdG9wdGlvbnM9e29wdGlvbnN9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG5cdFx0XHRcdFx0dmFsdWU9e211bHRpID8gbXVsdGlWYWx1ZSA6IHZhbHVlfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3JlYXRhYmxlRGVtbztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAnY3JlYXRlLXJlYWN0LWNsYXNzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgR3JhdmF0YXIgZnJvbSAncmVhY3QtZ3JhdmF0YXInO1xuXG5jb25zdCBVU0VSUyA9IHJlcXVpcmUoJy4uL2RhdGEvdXNlcnMnKTtcbmNvbnN0IEdSQVZBVEFSX1NJWkUgPSAxNTtcblxuY29uc3QgR3JhdmF0YXJPcHRpb24gPSBjcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0aXNGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRpc1NlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b3B0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdH0sXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VFbnRlciAoZXZlbnQpIHtcblx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VNb3ZlIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmlzRm9jdXNlZCkgcmV0dXJuO1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGxldCBncmF2YXRhclN0eWxlID0ge1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0XHRtYXJnaW5SaWdodDogMTAsXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdHRvcDogLTIsXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0XHR9O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0b25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9XG5cdFx0XHRcdG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX1cblx0XHRcdFx0dGl0bGU9e3RoaXMucHJvcHMub3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLm9wdGlvbi5lbWFpbH0gc2l6ZT17R1JBVkFUQVJfU0laRX0gc3R5bGU9e2dyYXZhdGFyU3R5bGV9IC8+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IEdyYXZhdGFyVmFsdWUgPSBjcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0XHRwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBncmF2YXRhclN0eWxlID0ge1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0XHRtYXJnaW5SaWdodDogMTAsXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdHRvcDogLTIsXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0XHR9O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZVwiIHRpdGxlPXt0aGlzLnByb3BzLnZhbHVlLnRpdGxlfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlLWxhYmVsXCI+XG5cdFx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXt0aGlzLnByb3BzLnZhbHVlLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbmNvbnN0IFVzZXJzRmllbGQgPSBjcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGhpbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHBsYWNlaG9sZGVyID0gPHNwYW4+JiM5Nzg2OyBTZWxlY3QgVXNlcjwvc3Bhbj47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0YXJyb3dSZW5kZXJlcj17YXJyb3dSZW5kZXJlcn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ9e0dyYXZhdGFyT3B0aW9ufVxuXHRcdFx0XHRcdG9wdGlvbnM9e1VTRVJTfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZUNvbXBvbmVudD17R3JhdmF0YXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5cblx0XHRcdFx0XHRUaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gT3B0aW9uIGFuZCBWYWx1ZSBjb21wb25lbnRzIHRvIHJlbmRlciBhIEdyYXZhdGFyIGltYWdlIGZvciBlYWNoIHVzZXIgYmFzZWQgb24gdGhlaXIgZW1haWwuXG5cdFx0XHRcdFx0SXQgYWxzbyBkZW1vbnN0cmF0ZXMgcmVuZGVyaW5nIEhUTUwgZWxlbWVudHMgYXMgdGhlIHBsYWNlaG9sZGVyLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBhcnJvd1JlbmRlcmVyICgpIHtcblx0cmV0dXJuIChcblx0XHQ8c3Bhbj4rPC9zcGFuPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IEhpZ2hsaWdodGVyIGZyb20gJ3JlYWN0LWhpZ2hsaWdodC13b3Jkcyc7XG5cbnZhciBEaXNhYmxlZFVwc2VsbE9wdGlvbnMgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnRGlzYWJsZWRVcHNlbGxPcHRpb25zJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnU3VwcG9ydCBsZXZlbCBzZWxlY3RlZDonLCB2YWx1ZS5sYWJlbCk7XG5cdFx0fVxuXHR9LFxuXHRyZW5kZXJMaW5rOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gPGEgc3R5bGU9e3sgbWFyZ2luTGVmdDogNSB9fSBocmVmPVwiL3VwZ3JhZGVcIiB0YXJnZXQ9XCJfYmxhbmtcIj5VcGdyYWRlIGhlcmUhPC9hPjtcblx0fSxcblx0cmVuZGVyT3B0aW9uOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEhpZ2hsaWdodGVyXG5cdFx0XHQgIHNlYXJjaFdvcmRzPXtbdGhpcy5faW5wdXRWYWx1ZV19XG5cdFx0XHQgIHRleHRUb0hpZ2hsaWdodD17b3B0aW9uLmxhYmVsfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXJWYWx1ZTogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzdHJvbmcgc3R5bGU9e3sgY29sb3I6IG9wdGlvbi5jb2xvciB9fT57b3B0aW9uLmxhYmVsfTwvc3Ryb25nPjtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFtcblx0XHRcdHsgbGFiZWw6ICdCYXNpYyBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdiYXNpYycsIGNvbG9yOiAnI0UzMTg2NCcgfSxcblx0XHRcdHsgbGFiZWw6ICdQcmVtaXVtIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3ByZW1pdW0nLCBjb2xvcjogJyM2MjE2QTMnIH0sXG5cdFx0XHR7IGxhYmVsOiAnUHJvIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3BybycsIGRpc2FibGVkOiB0cnVlLCBsaW5rOiB0aGlzLnJlbmRlckxpbmsoKSB9LFxuXHRcdF07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdG9uSW5wdXRDaGFuZ2U9eyhpbnB1dFZhbHVlKSA9PiB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZX1cblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyPXt0aGlzLnJlbmRlck9wdGlvbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZVJlbmRlcmVyPXt0aGlzLnJlbmRlclZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZGVtb25zdGF0ZXMgY3VzdG9tIHJlbmRlciBtZXRob2RzIGFuZCBsaW5rcyBpbiBkaXNhYmxlZCBvcHRpb25zPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGlzYWJsZWRVcHNlbGxPcHRpb25zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJztcblxuXG5jb25zdCBHaXRodWJVc2VycyA9IGNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdHaXRodWJVc2VycycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRiYWNrc3BhY2VSZW1vdmVzOiB0cnVlLFxuXHRcdFx0bXVsdGk6IHRydWVcblx0XHR9O1xuXHR9LFxuXHRvbkNoYW5nZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9NdWx0aSAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHRcdHZhbHVlOiBbdGhpcy5zdGF0ZS52YWx1ZV0sXG5cdFx0fSk7XG5cdH0sXG5cdHN3aXRjaFRvU2luZ2xlICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlID8gdGhpcy5zdGF0ZS52YWx1ZVswXSA6IG51bGxcblx0XHR9KTtcblx0fSxcblx0Z2V0VXNlcnMgKGlucHV0KSB7XG5cdFx0aWYgKCFpbnB1dCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IG9wdGlvbnM6IFtdIH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvdXNlcnM/cT0ke2lucHV0fWApXG5cdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0LnRoZW4oKGpzb24pID0+IHtcblx0XHRcdHJldHVybiB7IG9wdGlvbnM6IGpzb24uaXRlbXMgfTtcblx0XHR9KTtcblx0fSxcblx0Z290b1VzZXIgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKHZhbHVlLmh0bWxfdXJsKTtcblx0fSxcblx0dG9nZ2xlQmFja3NwYWNlUmVtb3ZlcyAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRiYWNrc3BhY2VSZW1vdmVzOiAhdGhpcy5zdGF0ZS5iYWNrc3BhY2VSZW1vdmVzXG5cdFx0fSk7XG5cdH0sXG5cdHRvZ2dsZUNyZWF0YWJsZSAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjcmVhdGFibGU6ICF0aGlzLnN0YXRlLmNyZWF0YWJsZVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IEFzeW5jQ29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jcmVhdGFibGVcblx0XHRcdD8gU2VsZWN0LkFzeW5jQ3JlYXRhYmxlXG5cdFx0XHQ6IFNlbGVjdC5Bc3luYztcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxBc3luY0NvbXBvbmVudCBtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvblZhbHVlQ2xpY2s9e3RoaXMuZ290b1VzZXJ9IHZhbHVlS2V5PVwiaWRcIiBsYWJlbEtleT1cImxvZ2luXCIgbG9hZE9wdGlvbnM9e3RoaXMuZ2V0VXNlcnN9IGJhY2tzcGFjZVJlbW92ZXM9e3RoaXMuc3RhdGUuYmFja3NwYWNlUmVtb3Zlc30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0ICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNyZWF0YWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ3JlYXRhYmxlfSAvPlxuXHRcdFx0XHRcdCAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+Q3JlYXRhYmxlPzwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdCAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5iYWNrc3BhY2VSZW1vdmVzfSBvbkNoYW5nZT17dGhpcy50b2dnbGVCYWNrc3BhY2VSZW1vdmVzfSAvPlxuXHRcdFx0XHRcdCAgIDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+QmFja3NwYWNlIFJlbW92ZXM/PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgdXNlcyBmZXRjaC5qcyBmb3Igc2hvd2luZyBBc3luYyBvcHRpb25zIHdpdGggUHJvbWlzZXM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdpdGh1YlVzZXJzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgRkxBVk9VUlMgPSBbXG5cdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0eyBsYWJlbDogJ1ZhbmlsbGEnLCB2YWx1ZTogJ3ZhbmlsbGEnIH0sXG5cdHsgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9LFxuXHR7IGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcblx0eyBsYWJlbDogJ0Nvb2tpZXMgYW5kIENyZWFtJywgdmFsdWU6ICdjb29raWVzY3JlYW0nIH0sXG5cdHsgbGFiZWw6ICdQZXBwZXJtaW50JywgdmFsdWU6ICdwZXBwZXJtaW50JyB9LFxuXTtcblxuY29uc3QgV0hZX1dPVUxEX1lPVSA9IFtcblx0eyBsYWJlbDogJ0Nob2NvbGF0ZSAoYXJlIHlvdSBjcmF6eT8pJywgdmFsdWU6ICdjaG9jb2xhdGUnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuXS5jb25jYXQoRkxBVk9VUlMuc2xpY2UoMSkpO1xuXG52YXIgTXVsdGlTZWxlY3RGaWVsZCA9IGNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdNdWx0aVNlbGVjdEZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdGNyYXp5OiBmYWxzZSxcblx0XHRcdG9wdGlvbnM6IEZMQVZPVVJTLFxuXHRcdFx0dmFsdWU6IFtdLFxuXHRcdH07XG5cdH0sXG5cdGhhbmRsZVNlbGVjdENoYW5nZSAodmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnWW91XFwndmUgc2VsZWN0ZWQ6JywgdmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0dG9nZ2xlRGlzYWJsZWQgKGUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGlzYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG5cdH0sXG5cdHRvZ2dsZUNob2NvbGF0ZSAoZSkge1xuXHRcdGxldCBjcmF6eSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjcmF6eTogY3JhenksXG5cdFx0XHRvcHRpb25zOiBjcmF6eSA/IFdIWV9XT1VMRF9ZT1UgOiBGTEFWT1VSUyxcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0IG11bHRpIHNpbXBsZVZhbHVlIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBmYXZvdXJpdGUocylcIiBvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdENoYW5nZX0gLz5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlRGlzYWJsZWR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkRpc2FibGUgdGhlIGNvbnRyb2w8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jcmF6eX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hvY29sYXRlfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5JIGRvbid0IGxpa2UgQ2hvY29sYXRlIChkaXNhYmxlZCB0aGUgb3B0aW9uKTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpU2VsZWN0RmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ2NyZWF0ZS1yZWFjdC1jbGFzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG52YXIgVmFsdWVzQXNOdW1iZXJzRmllbGQgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnVmFsdWVzQXNOdW1iZXJzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUHJvcFR5cGVzLnN0cmluZ1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgdmFsdWU6IDEwLCBsYWJlbDogJ1RlbicgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTEsIGxhYmVsOiAnRWxldmVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMiwgbGFiZWw6ICdUd2VsdmUnIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDIzLCBsYWJlbDogJ1R3ZW50eS10aHJlZScgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjQsIGxhYmVsOiAnVHdlbnR5LWZvdXInIH1cblx0XHRcdF0sXG5cdFx0XHRtYXRjaFBvczogJ2FueScsXG5cdFx0XHRtYXRjaFZhbHVlOiB0cnVlLFxuXHRcdFx0bWF0Y2hMYWJlbDogdHJ1ZSxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdFx0bXVsdGk6IGZhbHNlXG5cdFx0fTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaFN0YXJ0KGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaFBvczogZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyAnc3RhcnQnIDogJ2FueSdcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaFZhbHVlKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaFZhbHVlOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoTGFiZWwoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoTGFiZWw6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdOdW1lcmljIFNlbGVjdCB2YWx1ZSBjaGFuZ2VkIHRvJywgdmFsdWUpO1xuXHR9LFxuXHRvbkNoYW5nZU11bHRpKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgbWF0Y2hQcm9wID0gJ2FueSc7XG5cdFx0aWYgKHRoaXMuc3RhdGUubWF0Y2hMYWJlbCAmJiAhdGhpcy5zdGF0ZS5tYXRjaFZhbHVlKSB7XG5cdFx0XHRtYXRjaFByb3AgPSAnbGFiZWwnO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuc3RhdGUubWF0Y2hMYWJlbCAmJiB0aGlzLnN0YXRlLm1hdGNoVmFsdWUpIHtcblx0XHRcdG1hdGNoUHJvcCA9ICd2YWx1ZSc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRtYXRjaFBvcz17dGhpcy5zdGF0ZS5tYXRjaFBvc31cblx0XHRcdFx0XHRtYXRjaFByb3A9e21hdGNoUHJvcH1cblx0XHRcdFx0XHRtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9XG5cdFx0XHRcdFx0c2ltcGxlVmFsdWVcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNdWx0aX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGktU2VsZWN0PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hWYWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaFZhbHVlfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NYXRjaCB2YWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoTGFiZWx9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hMYWJlbH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggbGFiZWw8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaFBvcyA9PT0gJ3N0YXJ0J30gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaFN0YXJ0fSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5Pbmx5IGluY2x1ZGUgbWF0Y2hlcyBmcm9tIHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgdXNlcyBzaW1wbGUgbnVtZXJpYyB2YWx1ZXM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlc0FzTnVtYmVyc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgU1RBVEVTID0gcmVxdWlyZSgnLi4vZGF0YS9zdGF0ZXMnKTtcblxudmFyIFN0YXRlc0ZpZWxkID0gY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1N0YXRlc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxhYmVsOiAnU3RhdGVzOicsXG5cdFx0XHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvdW50cnk6ICdBVScsXG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRzZWFyY2hhYmxlOiB0aGlzLnByb3BzLnNlYXJjaGFibGUsXG5cdFx0XHRzZWxlY3RWYWx1ZTogJ25ldy1zb3V0aC13YWxlcycsXG5cdFx0XHRjbGVhcmFibGU6IHRydWUsXG5cdFx0fTtcblx0fSxcblx0c3dpdGNoQ291bnRyeSAoZSkge1xuXHRcdHZhciBuZXdDb3VudHJ5ID0gZS50YXJnZXQudmFsdWU7XG5cdFx0Y29uc29sZS5sb2coJ0NvdW50cnkgY2hhbmdlZCB0byAnICsgbmV3Q291bnRyeSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjb3VudHJ5OiBuZXdDb3VudHJ5LFxuXHRcdFx0c2VsZWN0VmFsdWU6IG51bGxcblx0XHR9KTtcblx0fSxcblx0dXBkYXRlVmFsdWUgKG5ld1ZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2coJ1N0YXRlIGNoYW5nZWQgdG8gJyArIG5ld1ZhbHVlKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdFZhbHVlOiBuZXdWYWx1ZVxuXHRcdH0pO1xuXHR9LFxuXHRmb2N1c1N0YXRlU2VsZWN0ICgpIHtcblx0XHR0aGlzLnJlZnMuc3RhdGVTZWxlY3QuZm9jdXMoKTtcblx0fSxcblx0dG9nZ2xlQ2hlY2tib3ggKGUpIHtcblx0XHRsZXQgbmV3U3RhdGUgPSB7fTtcblx0XHRuZXdTdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSBTVEFURVNbdGhpcy5zdGF0ZS5jb3VudHJ5XTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0IHJlZj1cInN0YXRlU2VsZWN0XCIgYXV0b2ZvY3VzIG9wdGlvbnM9e29wdGlvbnN9IHNpbXBsZVZhbHVlIGNsZWFyYWJsZT17dGhpcy5zdGF0ZS5jbGVhcmFibGV9IG5hbWU9XCJzZWxlY3RlZC1zdGF0ZVwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9IHNlYXJjaGFibGU9e3RoaXMuc3RhdGUuc2VhcmNoYWJsZX0gLz5cblxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogMTQgfX0+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5mb2N1c1N0YXRlU2VsZWN0fT5Gb2N1cyBTZWxlY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fT5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgbmFtZT1cInNlYXJjaGFibGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnNlYXJjaGFibGV9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNlYXJjaGFibGU8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fT5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgbmFtZT1cImRpc2FibGVkXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+RGlzYWJsZWQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fT5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgbmFtZT1cImNsZWFyYWJsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY2xlYXJhYmxlfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5DbGVhcmFibGU8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNvdW50cnkgPT09ICdBVSd9IHZhbHVlPVwiQVVcIiBvbkNoYW5nZT17dGhpcy5zd2l0Y2hDb3VudHJ5fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkF1c3RyYWxpYTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNvdW50cnkgPT09ICdVUyd9IHZhbHVlPVwiVVNcIiBvbkNoYW5nZT17dGhpcy5zd2l0Y2hDb3VudHJ5fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlVuaXRlZCBTdGF0ZXM8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdjcmVhdGUtcmVhY3QtY2xhc3MnO1xuaW1wb3J0IFZpcnR1YWxpemVkU2VsZWN0IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdCc7XG5cbmNvbnN0IERBVEEgPSByZXF1aXJlKCcuLi9kYXRhL2NpdGllcycpO1xuXG52YXIgQ2l0aWVzRmllbGQgPSBjcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ2l0aWVzRmllbGQnLFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0dXBkYXRlVmFsdWUgKG5ld1ZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWVcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IERBVEEuQ0lUSUVTO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPkNpdGllcyAoTGFyZ2UgRGF0YXNldCk8L2gzPlxuXHRcdFx0XHQ8VmlydHVhbGl6ZWRTZWxlY3QgcmVmPVwiY2l0eVNlbGVjdFwiXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdGNsZWFyYWJsZVxuXHRcdFx0XHRcdG5hbWU9XCJzZWxlY3QtY2l0eVwiXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9XG5cdFx0XHRcdFx0c2VhcmNoYWJsZVxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJuYW1lXCJcblx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VXNlcyA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWRcIj5yZWFjdC12aXJ0dWFsaXplZDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC1zZWxlY3QvXCI+cmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0PC9hPiB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgd29ybGQncyAxLDAwMCBsYXJnZXN0IGNpdGllcy5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENpdGllc0ZpZWxkO1xuIiwiZXhwb3J0cy5DSVRJRVMgPSBbXG4gIHsgbmFtZTogJ0FiaWxlbmUnIH0sXG4gIHsgbmFtZTogJ0FkZGlzb24nIH0sXG4gIHsgbmFtZTogJ0Frcm9uJyB9LFxuICB7IG5hbWU6ICdBbGFtZWRhJyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJ1cXVlcnF1ZScgfSxcbiAgeyBuYW1lOiAnQWxleGFuZHJpYScgfSxcbiAgeyBuYW1lOiAnQWxleGFuZHJpYScgfSxcbiAgeyBuYW1lOiAnQWxoYW1icmEnIH0sXG4gIHsgbmFtZTogJ0FsaXNvIFZpZWpvJyB9LFxuICB7IG5hbWU6ICdBbGxlbicgfSxcbiAgeyBuYW1lOiAnQWxsZW50b3duJyB9LFxuICB7IG5hbWU6ICdBbHBoYXJldHRhJyB9LFxuICB7IG5hbWU6ICdBbHRhbW9udGUgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQWx0b29uYScgfSxcbiAgeyBuYW1lOiAnQW1hcmlsbG8nIH0sXG4gIHsgbmFtZTogJ0FtZXMnIH0sXG4gIHsgbmFtZTogJ0FuYWhlaW0nIH0sXG4gIHsgbmFtZTogJ0FuY2hvcmFnZScgfSxcbiAgeyBuYW1lOiAnQW5kZXJzb24nIH0sXG4gIHsgbmFtZTogJ0Fua2VueScgfSxcbiAgeyBuYW1lOiAnQW5uIEFyYm9yJyB9LFxuICB7IG5hbWU6ICdBbm5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0FudGlvY2gnIH0sXG4gIHsgbmFtZTogJ0FwYWNoZSBKdW5jdGlvbicgfSxcbiAgeyBuYW1lOiAnQXBleCcgfSxcbiAgeyBuYW1lOiAnQXBvcGthJyB9LFxuICB7IG5hbWU6ICdBcHBsZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0FwcGxlIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnQXBwbGV0b24nIH0sXG4gIHsgbmFtZTogJ0FyY2FkaWEnIH0sXG4gIHsgbmFtZTogJ0FybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQXJsaW5ndG9uIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0FydmFkYScgfSxcbiAgeyBuYW1lOiAnQXNoZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdBdGhlbnMtQ2xhcmtlIENvdW50eScgfSxcbiAgeyBuYW1lOiAnQXRsYW50YScgfSxcbiAgeyBuYW1lOiAnQXRsYW50aWMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQXR0bGVib3JvJyB9LFxuICB7IG5hbWU6ICdBdWJ1cm4nIH0sXG4gIHsgbmFtZTogJ0F1YnVybicgfSxcbiAgeyBuYW1lOiAnQXVndXN0YS1SaWNobW9uZCBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0F1cm9yYScgfSxcbiAgeyBuYW1lOiAnQXVyb3JhJyB9LFxuICB7IG5hbWU6ICdBdXN0aW4nIH0sXG4gIHsgbmFtZTogJ0F2ZW50dXJhJyB9LFxuICB7IG5hbWU6ICdBdm9uZGFsZScgfSxcbiAgeyBuYW1lOiAnQXp1c2EnIH0sXG4gIHsgbmFtZTogJ0Jha2Vyc2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdCYWxkd2luIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0JhbHRpbW9yZScgfSxcbiAgeyBuYW1lOiAnQmFybnN0YWJsZSBUb3duJyB9LFxuICB7IG5hbWU6ICdCYXJ0bGV0dCcgfSxcbiAgeyBuYW1lOiAnQmFydGxldHQnIH0sXG4gIHsgbmFtZTogJ0JhdG9uIFJvdWdlJyB9LFxuICB7IG5hbWU6ICdCYXR0bGUgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0JheW9ubmUnIH0sXG4gIHsgbmFtZTogJ0JheXRvd24nIH0sXG4gIHsgbmFtZTogJ0JlYXVtb250JyB9LFxuICB7IG5hbWU6ICdCZWF1bW9udCcgfSxcbiAgeyBuYW1lOiAnQmVhdmVyY3JlZWsnIH0sXG4gIHsgbmFtZTogJ0JlYXZlcnRvbicgfSxcbiAgeyBuYW1lOiAnQmVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnQmVsbCBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZ1ZScgfSxcbiAgeyBuYW1lOiAnQmVsbGV2dWUnIH0sXG4gIHsgbmFtZTogJ0JlbGxmbG93ZXInIH0sXG4gIHsgbmFtZTogJ0JlbGxpbmdoYW0nIH0sXG4gIHsgbmFtZTogJ0JlbG9pdCcgfSxcbiAgeyBuYW1lOiAnQmVuZCcgfSxcbiAgeyBuYW1lOiAnQmVudG9udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JlcmtlbGV5JyB9LFxuICB7IG5hbWU6ICdCZXJ3eW4nIH0sXG4gIHsgbmFtZTogJ0JldGhsZWhlbScgfSxcbiAgeyBuYW1lOiAnQmV2ZXJseScgfSxcbiAgeyBuYW1lOiAnQmlsbGluZ3MnIH0sXG4gIHsgbmFtZTogJ0JpbG94aScgfSxcbiAgeyBuYW1lOiAnQmluZ2hhbXRvbicgfSxcbiAgeyBuYW1lOiAnQmlybWluZ2hhbScgfSxcbiAgeyBuYW1lOiAnQmlzbWFyY2snIH0sXG4gIHsgbmFtZTogJ0JsYWNrc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0JsYWluZScgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmx1ZSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdCb2NhIFJhdG9uJyB9LFxuICB7IG5hbWU6ICdCb2lzZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdCb2xpbmdicm9vaycgfSxcbiAgeyBuYW1lOiAnQm9uaXRhIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0Jvc3NpZXIgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQm9zdG9uJyB9LFxuICB7IG5hbWU6ICdCb3VsZGVyJyB9LFxuICB7IG5hbWU6ICdCb3VudGlmdWwnIH0sXG4gIHsgbmFtZTogJ0Jvd2llJyB9LFxuICB7IG5hbWU6ICdCb3dsaW5nIEdyZWVuJyB9LFxuICB7IG5hbWU6ICdCb3ludG9uIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdCb3plbWFuJyB9LFxuICB7IG5hbWU6ICdCcmFkZW50b24nIH0sXG4gIHsgbmFtZTogJ0JyZWEnIH0sXG4gIHsgbmFtZTogJ0JyZW1lcnRvbicgfSxcbiAgeyBuYW1lOiAnQnJlbnR3b29kJyB9LFxuICB7IG5hbWU6ICdCcmVudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0JyaWRnZXBvcnQnIH0sXG4gIHsgbmFtZTogJ0JyaXN0b2wnIH0sXG4gIHsgbmFtZTogJ0Jyb2NrdG9uJyB9LFxuICB7IG5hbWU6ICdCcm9rZW4gQXJyb3cnIH0sXG4gIHsgbmFtZTogJ0Jyb29rZmllbGQnIH0sXG4gIHsgbmFtZTogJ0Jyb29raGF2ZW4nIH0sXG4gIHsgbmFtZTogJ0Jyb29rbHluIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0Jyb29tZmllbGQnIH0sXG4gIHsgbmFtZTogJ0Jyb3duc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdCcnlhbicgfSxcbiAgeyBuYW1lOiAnQnVja2V5ZScgfSxcbiAgeyBuYW1lOiAnQnVlbmEgUGFyaycgfSxcbiAgeyBuYW1lOiAnQnVmZmFsbycgfSxcbiAgeyBuYW1lOiAnQnVmZmFsbyBHcm92ZScgfSxcbiAgeyBuYW1lOiAnQnVsbGhlYWQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQnVyYmFuaycgfSxcbiAgeyBuYW1lOiAnQnVyaWVuJyB9LFxuICB7IG5hbWU6ICdCdXJsZXNvbicgfSxcbiAgeyBuYW1lOiAnQnVybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQnVybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQnVybnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2FsZHdlbGwnIH0sXG4gIHsgbmFtZTogJ0NhbGV4aWNvJyB9LFxuICB7IG5hbWU6ICdDYWx1bWV0IENpdHknIH0sXG4gIHsgbmFtZTogJ0NhbWFyaWxsbycgfSxcbiAgeyBuYW1lOiAnQ2FtYnJpZGdlJyB9LFxuICB7IG5hbWU6ICdDYW1kZW4nIH0sXG4gIHsgbmFtZTogJ0NhbXBiZWxsJyB9LFxuICB7IG5hbWU6ICdDYW50b24nIH0sXG4gIHsgbmFtZTogJ0NhcGUgQ29yYWwnIH0sXG4gIHsgbmFtZTogJ0NhcGUgR2lyYXJkZWF1JyB9LFxuICB7IG5hbWU6ICdDYXJsc2JhZCcgfSxcbiAgeyBuYW1lOiAnQ2FybWVsJyB9LFxuICB7IG5hbWU6ICdDYXJvbCBTdHJlYW0nIH0sXG4gIHsgbmFtZTogJ0NhcnBlbnRlcnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2Fycm9sbHRvbicgfSxcbiAgeyBuYW1lOiAnQ2Fyc29uJyB9LFxuICB7IG5hbWU6ICdDYXJzb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2FyeScgfSxcbiAgeyBuYW1lOiAnQ2FzYSBHcmFuZGUnIH0sXG4gIHsgbmFtZTogJ0Nhc3BlcicgfSxcbiAgeyBuYW1lOiAnQ2FzdGxlIFJvY2snIH0sXG4gIHsgbmFtZTogJ0NhdGhlZHJhbCBDaXR5JyB9LFxuICB7IG5hbWU6ICdDZWRhciBGYWxscycgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgSGlsbCcgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgUGFyaycgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdDZW50ZW5uaWFsJyB9LFxuICB7IG5hbWU6ICdDZXJlcycgfSxcbiAgeyBuYW1lOiAnQ2Vycml0b3MnIH0sXG4gIHsgbmFtZTogJ0NoYW1wYWlnbicgfSxcbiAgeyBuYW1lOiAnQ2hhbmRsZXInIH0sXG4gIHsgbmFtZTogJ0NoYXBlbCBIaWxsJyB9LFxuICB7IG5hbWU6ICdDaGFybGVzdG9uJyB9LFxuICB7IG5hbWU6ICdDaGFybGVzdG9uJyB9LFxuICB7IG5hbWU6ICdDaGFybG90dGUnIH0sXG4gIHsgbmFtZTogJ0NoYXJsb3R0ZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2hhdHRhbm9vZ2EnIH0sXG4gIHsgbmFtZTogJ0NoZWxzZWEnIH0sXG4gIHsgbmFtZTogJ0NoZXNhcGVha2UnIH0sXG4gIHsgbmFtZTogJ0NoZXN0ZXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQ2hleWVubmUnIH0sXG4gIHsgbmFtZTogJ0NoaWNhZ28nIH0sXG4gIHsgbmFtZTogJ0NoaWNvJyB9LFxuICB7IG5hbWU6ICdDaGljb3BlZScgfSxcbiAgeyBuYW1lOiAnQ2hpbm8nIH0sXG4gIHsgbmFtZTogJ0NoaW5vIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdDaHVsYSBWaXN0YScgfSxcbiAgeyBuYW1lOiAnQ2ljZXJvJyB9LFxuICB7IG5hbWU6ICdDaW5jaW5uYXRpJyB9LFxuICB7IG5hbWU6ICdDaXRydXMgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQ2xhcmtzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NsZWFyd2F0ZXInIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCcgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQ2xpZnRvbicgfSxcbiAgeyBuYW1lOiAnQ2xvdmlzJyB9LFxuICB7IG5hbWU6ICdDbG92aXMnIH0sXG4gIHsgbmFtZTogJ0NvYWNoZWxsYScgfSxcbiAgeyBuYW1lOiAnQ29jb251dCBDcmVlaycgfSxcbiAgeyBuYW1lOiAnQ29ldXIgZFxcJ0FsZW5lJyB9LFxuICB7IG5hbWU6ICdDb2xsZWdlIFN0YXRpb24nIH0sXG4gIHsgbmFtZTogJ0NvbGxpZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ29sb3JhZG8gU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQ29sdG9uJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJpYScgfSxcbiAgeyBuYW1lOiAnQ29sdW1iaWEnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbW1lcmNlIENpdHknIH0sXG4gIHsgbmFtZTogJ0NvbXB0b24nIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbnJvZScgfSxcbiAgeyBuYW1lOiAnQ29ud2F5JyB9LFxuICB7IG5hbWU6ICdDb29uIFJhcGlkcycgfSxcbiAgeyBuYW1lOiAnQ29wcGVsbCcgfSxcbiAgeyBuYW1lOiAnQ29yYWwgR2FibGVzJyB9LFxuICB7IG5hbWU6ICdDb3JhbCBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdDb3JvbmEnIH0sXG4gIHsgbmFtZTogJ0NvcnB1cyBDaHJpc3RpJyB9LFxuICB7IG5hbWU6ICdDb3J2YWxsaXMnIH0sXG4gIHsgbmFtZTogJ0Nvc3RhIE1lc2EnIH0sXG4gIHsgbmFtZTogJ0NvdW5jaWwgQmx1ZmZzJyB9LFxuICB7IG5hbWU6ICdDb3ZpbmEnIH0sXG4gIHsgbmFtZTogJ0NvdmluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQ3JhbnN0b24nIH0sXG4gIHsgbmFtZTogJ0NyeXN0YWwgTGFrZScgfSxcbiAgeyBuYW1lOiAnQ3VsdmVyIENpdHknIH0sXG4gIHsgbmFtZTogJ0N1cGVydGlubycgfSxcbiAgeyBuYW1lOiAnQ3V0bGVyIEJheScgfSxcbiAgeyBuYW1lOiAnQ3V5YWhvZ2EgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0N5cHJlc3MnIH0sXG4gIHsgbmFtZTogJ0RhbGxhcycgfSxcbiAgeyBuYW1lOiAnRGFseSBDaXR5JyB9LFxuICB7IG5hbWU6ICdEYW5idXJ5JyB9LFxuICB7IG5hbWU6ICdEYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRGFudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0RhdmVucG9ydCcgfSxcbiAgeyBuYW1lOiAnRGF2aWUnIH0sXG4gIHsgbmFtZTogJ0RhdmlzJyB9LFxuICB7IG5hbWU6ICdEYXl0b24nIH0sXG4gIHsgbmFtZTogJ0RheXRvbmEgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlS2FsYicgfSxcbiAgeyBuYW1lOiAnRGVTb3RvJyB9LFxuICB7IG5hbWU6ICdEZWFyYm9ybicgfSxcbiAgeyBuYW1lOiAnRGVhcmJvcm4gSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnRGVjYXR1cicgfSxcbiAgeyBuYW1lOiAnRGVjYXR1cicgfSxcbiAgeyBuYW1lOiAnRGVlcmZpZWxkIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZWxhbm8nIH0sXG4gIHsgbmFtZTogJ0RlbHJheSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVsdG9uYScgfSxcbiAgeyBuYW1lOiAnRGVudG9uJyB9LFxuICB7IG5hbWU6ICdEZW52ZXInIH0sXG4gIHsgbmFtZTogJ0RlcyBNb2luZXMnIH0sXG4gIHsgbmFtZTogJ0RlcyBQbGFpbmVzJyB9LFxuICB7IG5hbWU6ICdEZXRyb2l0JyB9LFxuICB7IG5hbWU6ICdEaWFtb25kIEJhcicgfSxcbiAgeyBuYW1lOiAnRG9yYWwnIH0sXG4gIHsgbmFtZTogJ0RvdGhhbicgfSxcbiAgeyBuYW1lOiAnRG92ZXInIH0sXG4gIHsgbmFtZTogJ0Rvd25lcnMgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0Rvd25leScgfSxcbiAgeyBuYW1lOiAnRHJhcGVyJyB9LFxuICB7IG5hbWU6ICdEdWJsaW4nIH0sXG4gIHsgbmFtZTogJ0R1YmxpbicgfSxcbiAgeyBuYW1lOiAnRHVidXF1ZScgfSxcbiAgeyBuYW1lOiAnRHVsdXRoJyB9LFxuICB7IG5hbWU6ICdEdW5jYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRHVud29vZHknIH0sXG4gIHsgbmFtZTogJ0R1cmhhbScgfSxcbiAgeyBuYW1lOiAnRWFnYW4nIH0sXG4gIHsgbmFtZTogJ0Vhc3QgTGFuc2luZycgfSxcbiAgeyBuYW1lOiAnRWFzdCBPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ0Vhc3QgUHJvdmlkZW5jZScgfSxcbiAgeyBuYW1lOiAnRWFzdHZhbGUnIH0sXG4gIHsgbmFtZTogJ0VhdSBDbGFpcmUnIH0sXG4gIHsgbmFtZTogJ0VkZW4gUHJhaXJpZScgfSxcbiAgeyBuYW1lOiAnRWRpbmEnIH0sXG4gIHsgbmFtZTogJ0VkaW5idXJnJyB9LFxuICB7IG5hbWU6ICdFZG1vbmQnIH0sXG4gIHsgbmFtZTogJ0VkbW9uZHMnIH0sXG4gIHsgbmFtZTogJ0VsIENham9uJyB9LFxuICB7IG5hbWU6ICdFbCBDZW50cm8nIH0sXG4gIHsgbmFtZTogJ0VsIE1vbnRlJyB9LFxuICB7IG5hbWU6ICdFbCBQYXNvJyB9LFxuICB7IG5hbWU6ICdFbGdpbicgfSxcbiAgeyBuYW1lOiAnRWxpemFiZXRoJyB9LFxuICB7IG5hbWU6ICdFbGsgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0Vsa2hhcnQnIH0sXG4gIHsgbmFtZTogJ0VsbWh1cnN0JyB9LFxuICB7IG5hbWU6ICdFbHlyaWEnIH0sXG4gIHsgbmFtZTogJ0VuY2luaXRhcycgfSxcbiAgeyBuYW1lOiAnRW5pZCcgfSxcbiAgeyBuYW1lOiAnRXJpZScgfSxcbiAgeyBuYW1lOiAnRXNjb25kaWRvJyB9LFxuICB7IG5hbWU6ICdFdWNsaWQnIH0sXG4gIHsgbmFtZTogJ0V1Z2VuZScgfSxcbiAgeyBuYW1lOiAnRXVsZXNzJyB9LFxuICB7IG5hbWU6ICdFdmFuc3RvbicgfSxcbiAgeyBuYW1lOiAnRXZhbnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnRXZlcmV0dCcgfSxcbiAgeyBuYW1lOiAnRXZlcmV0dCcgfSxcbiAgeyBuYW1lOiAnRmFpcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdGYWlyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0ZhbGwgUml2ZXInIH0sXG4gIHsgbmFtZTogJ0ZhcmdvJyB9LFxuICB7IG5hbWU6ICdGYXJtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdGYXJtaW5ndG9uIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdGYXlldHRldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0ZheWV0dGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnRmVkZXJhbCBXYXknIH0sXG4gIHsgbmFtZTogJ0ZpbmRsYXknIH0sXG4gIHsgbmFtZTogJ0Zpc2hlcnMnIH0sXG4gIHsgbmFtZTogJ0ZpdGNoYnVyZycgfSxcbiAgeyBuYW1lOiAnRmxhZ3N0YWZmJyB9LFxuICB7IG5hbWU6ICdGbGludCcgfSxcbiAgeyBuYW1lOiAnRmxvcmVuY2UnIH0sXG4gIHsgbmFtZTogJ0Zsb3JlbmNlJyB9LFxuICB7IG5hbWU6ICdGbG9yaXNzYW50JyB9LFxuICB7IG5hbWU6ICdGbG93ZXIgTW91bmQnIH0sXG4gIHsgbmFtZTogJ0ZvbHNvbScgfSxcbiAgeyBuYW1lOiAnRm9uZCBkdSBMYWMnIH0sXG4gIHsgbmFtZTogJ0ZvbnRhbmEnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgQ29sbGlucycgfSxcbiAgeyBuYW1lOiAnRm9ydCBMYXVkZXJkYWxlJyB9LFxuICB7IG5hbWU6ICdGb3J0IE15ZXJzJyB9LFxuICB7IG5hbWU6ICdGb3J0IFBpZXJjZScgfSxcbiAgeyBuYW1lOiAnRm9ydCBTbWl0aCcgfSxcbiAgeyBuYW1lOiAnRm9ydCBXYXluZScgfSxcbiAgeyBuYW1lOiAnRm9ydCBXb3J0aCcgfSxcbiAgeyBuYW1lOiAnRm91bnRhaW4gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdGcmFua2xpbicgfSxcbiAgeyBuYW1lOiAnRnJlZGVyaWNrJyB9LFxuICB7IG5hbWU6ICdGcmVlcG9ydCcgfSxcbiAgeyBuYW1lOiAnRnJlbW9udCcgfSxcbiAgeyBuYW1lOiAnRnJlc25vJyB9LFxuICB7IG5hbWU6ICdGcmllbmRzd29vZCcgfSxcbiAgeyBuYW1lOiAnRnJpc2NvJyB9LFxuICB7IG5hbWU6ICdGdWxsZXJ0b24nIH0sXG4gIHsgbmFtZTogJ0dhaW5lc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdHYWl0aGVyc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0dhbHZlc3RvbicgfSxcbiAgeyBuYW1lOiAnR2FyZGVuIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdHYXJkZW5hJyB9LFxuICB7IG5hbWU6ICdHYXJsYW5kJyB9LFxuICB7IG5hbWU6ICdHYXJ5JyB9LFxuICB7IG5hbWU6ICdHYXN0b25pYScgfSxcbiAgeyBuYW1lOiAnR2VvcmdldG93bicgfSxcbiAgeyBuYW1lOiAnR2VybWFudG93bicgfSxcbiAgeyBuYW1lOiAnR2lsYmVydCcgfSxcbiAgeyBuYW1lOiAnR2lscm95JyB9LFxuICB7IG5hbWU6ICdHbGVuZGFsZScgfSxcbiAgeyBuYW1lOiAnR2xlbmRhbGUnIH0sXG4gIHsgbmFtZTogJ0dsZW5kb3JhJyB9LFxuICB7IG5hbWU6ICdHbGVudmlldycgfSxcbiAgeyBuYW1lOiAnR29vZHllYXInIH0sXG4gIHsgbmFtZTogJ0dvb3NlIENyZWVrJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBGb3JrcycgfSxcbiAgeyBuYW1lOiAnR3JhbmQgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBKdW5jdGlvbicgfSxcbiAgeyBuYW1lOiAnR3JhbmQgUHJhaXJpZScgfSxcbiAgeyBuYW1lOiAnR3JhbmQgUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdHcmFwZXZpbmUnIH0sXG4gIHsgbmFtZTogJ0dyZWF0IEZhbGxzJyB9LFxuICB7IG5hbWU6ICdHcmVlbGV5JyB9LFxuICB7IG5hbWU6ICdHcmVlbiBCYXknIH0sXG4gIHsgbmFtZTogJ0dyZWVuYWNyZXMnIH0sXG4gIHsgbmFtZTogJ0dyZWVuZmllbGQnIH0sXG4gIHsgbmFtZTogJ0dyZWVuc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ0dyZWVudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dyZWVudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dyZWVud29vZCcgfSxcbiAgeyBuYW1lOiAnR3Jlc2hhbScgfSxcbiAgeyBuYW1lOiAnR3JvdmUgQ2l0eScgfSxcbiAgeyBuYW1lOiAnR3VsZnBvcnQnIH0sXG4gIHsgbmFtZTogJ0hhY2tlbnNhY2snIH0sXG4gIHsgbmFtZTogJ0hhZ2Vyc3Rvd24nIH0sXG4gIHsgbmFtZTogJ0hhbGxhbmRhbGUgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0hhbHRvbSBDaXR5JyB9LFxuICB7IG5hbWU6ICdIYW1pbHRvbicgfSxcbiAgeyBuYW1lOiAnSGFtbW9uZCcgfSxcbiAgeyBuYW1lOiAnSGFtcHRvbicgfSxcbiAgeyBuYW1lOiAnSGFuZm9yZCcgfSxcbiAgeyBuYW1lOiAnSGFub3ZlciBQYXJrJyB9LFxuICB7IG5hbWU6ICdIYXJsaW5nZW4nIH0sXG4gIHsgbmFtZTogJ0hhcnJpc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0hhcnJpc29uYnVyZycgfSxcbiAgeyBuYW1lOiAnSGFydGZvcmQnIH0sXG4gIHsgbmFtZTogJ0hhdHRpZXNidXJnJyB9LFxuICB7IG5hbWU6ICdIYXZlcmhpbGwnIH0sXG4gIHsgbmFtZTogJ0hhd3Rob3JuZScgfSxcbiAgeyBuYW1lOiAnSGF5d2FyZCcgfSxcbiAgeyBuYW1lOiAnSGVtZXQnIH0sXG4gIHsgbmFtZTogJ0hlbXBzdGVhZCcgfSxcbiAgeyBuYW1lOiAnSGVuZGVyc29uJyB9LFxuICB7IG5hbWU6ICdIZW5kZXJzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSGVzcGVyaWEnIH0sXG4gIHsgbmFtZTogJ0hpYWxlYWgnIH0sXG4gIHsgbmFtZTogJ0hpY2tvcnknIH0sXG4gIHsgbmFtZTogJ0hpZ2ggUG9pbnQnIH0sXG4gIHsgbmFtZTogJ0hpZ2hsYW5kJyB9LFxuICB7IG5hbWU6ICdIaWxsc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ0hpbHRvbiBIZWFkIElzbGFuZCcgfSxcbiAgeyBuYW1lOiAnSG9ib2tlbicgfSxcbiAgeyBuYW1lOiAnSG9mZm1hbiBFc3RhdGVzJyB9LFxuICB7IG5hbWU6ICdIb2xseXdvb2QnIH0sXG4gIHsgbmFtZTogJ0hvbHlva2UnIH0sXG4gIHsgbmFtZTogJ0hvbWVzdGVhZCcgfSxcbiAgeyBuYW1lOiAnSG9ub2x1bHUnIH0sXG4gIHsgbmFtZTogJ0hvb3ZlcicgfSxcbiAgeyBuYW1lOiAnSG91c3RvbicgfSxcbiAgeyBuYW1lOiAnSHViZXIgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnSHVudGVyc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0h1bnRzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1bnRzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1cnN0JyB9LFxuICB7IG5hbWU6ICdIdXRjaGluc29uJyB9LFxuICB7IG5hbWU6ICdJZGFobyBGYWxscycgfSxcbiAgeyBuYW1lOiAnSW5kZXBlbmRlbmNlJyB9LFxuICB7IG5hbWU6ICdJbmRpYW5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0luZGlvJyB9LFxuICB7IG5hbWU6ICdJbmdsZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0lvd2EgQ2l0eScgfSxcbiAgeyBuYW1lOiAnSXJ2aW5lJyB9LFxuICB7IG5hbWU6ICdJcnZpbmcnIH0sXG4gIHsgbmFtZTogJ0phY2tzb24nIH0sXG4gIHsgbmFtZTogJ0phY2tzb24nIH0sXG4gIHsgbmFtZTogJ0phY2tzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmFja3NvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKYW5lc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdKZWZmZXJzb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnSmVmZmVyc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0plcnNleSBDaXR5JyB9LFxuICB7IG5hbWU6ICdKb2hucyBDcmVlaycgfSxcbiAgeyBuYW1lOiAnSm9obnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdKb2xpZXQnIH0sXG4gIHsgbmFtZTogJ0pvbmVzYm9ybycgfSxcbiAgeyBuYW1lOiAnSm9wbGluJyB9LFxuICB7IG5hbWU6ICdKdXBpdGVyJyB9LFxuICB7IG5hbWU6ICdKdXJ1cGEgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdLYWxhbWF6b28nIH0sXG4gIHsgbmFtZTogJ0thbm5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0thbnNhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdLYW5zYXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnS2Vhcm55JyB9LFxuICB7IG5hbWU6ICdLZWl6ZXInIH0sXG4gIHsgbmFtZTogJ0tlbGxlcicgfSxcbiAgeyBuYW1lOiAnS2VubmVyJyB9LFxuICB7IG5hbWU6ICdLZW5uZXdpY2snIH0sXG4gIHsgbmFtZTogJ0tlbm9zaGEnIH0sXG4gIHsgbmFtZTogJ0tlbnQnIH0sXG4gIHsgbmFtZTogJ0tlbnR3b29kJyB9LFxuICB7IG5hbWU6ICdLZXR0ZXJpbmcnIH0sXG4gIHsgbmFtZTogJ0tpbGxlZW4nIH0sXG4gIHsgbmFtZTogJ0tpbmdzcG9ydCcgfSxcbiAgeyBuYW1lOiAnS2lya2xhbmQnIH0sXG4gIHsgbmFtZTogJ0tpc3NpbW1lZScgfSxcbiAgeyBuYW1lOiAnS25veHZpbGxlJyB9LFxuICB7IG5hbWU6ICdLb2tvbW8nIH0sXG4gIHsgbmFtZTogJ0xhIENyb3NzZScgfSxcbiAgeyBuYW1lOiAnTGEgSGFicmEnIH0sXG4gIHsgbmFtZTogJ0xhIE1lc2EnIH0sXG4gIHsgbmFtZTogJ0xhIE1pcmFkYScgfSxcbiAgeyBuYW1lOiAnTGEgUHVlbnRlJyB9LFxuICB7IG5hbWU6ICdMYSBRdWludGEnIH0sXG4gIHsgbmFtZTogJ0xhY2V5JyB9LFxuICB7IG5hbWU6ICdMYWZheWV0dGUnIH0sXG4gIHsgbmFtZTogJ0xhZmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGFndW5hIE5pZ3VlbCcgfSxcbiAgeyBuYW1lOiAnTGFrZSBDaGFybGVzJyB9LFxuICB7IG5hbWU6ICdMYWtlIEVsc2lub3JlJyB9LFxuICB7IG5hbWU6ICdMYWtlIEZvcmVzdCcgfSxcbiAgeyBuYW1lOiAnTGFrZSBIYXZhc3UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTGFrZSBPc3dlZ28nIH0sXG4gIHsgbmFtZTogJ0xha2VsYW5kJyB9LFxuICB7IG5hbWU6ICdMYWtldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbnNpbmcnIH0sXG4gIHsgbmFtZTogJ0xhcmVkbycgfSxcbiAgeyBuYW1lOiAnTGFyZ28nIH0sXG4gIHsgbmFtZTogJ0xhcyBDcnVjZXMnIH0sXG4gIHsgbmFtZTogJ0xhcyBWZWdhcycgfSxcbiAgeyBuYW1lOiAnTGF1ZGVyaGlsbCcgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3dG9uJyB9LFxuICB7IG5hbWU6ICdMYXl0b24nIH0sXG4gIHsgbmFtZTogJ0xlYWd1ZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdMZWVcXCdzIFN1bW1pdCcgfSxcbiAgeyBuYW1lOiAnTGVlc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0xlaGknIH0sXG4gIHsgbmFtZTogJ0xlbmV4YScgfSxcbiAgeyBuYW1lOiAnTGVvbWluc3RlcicgfSxcbiAgeyBuYW1lOiAnTGV3aXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTGV4aW5ndG9uLUZheWV0dGUnIH0sXG4gIHsgbmFtZTogJ0xpbWEnIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4nIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4nIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4gUGFyaycgfSxcbiAgeyBuYW1lOiAnTGluZGVuJyB9LFxuICB7IG5hbWU6ICdMaXR0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnTGl0dGxldG9uJyB9LFxuICB7IG5hbWU6ICdMaXZlcm1vcmUnIH0sXG4gIHsgbmFtZTogJ0xpdm9uaWEnIH0sXG4gIHsgbmFtZTogJ0xvZGknIH0sXG4gIHsgbmFtZTogJ0xvZ2FuJyB9LFxuICB7IG5hbWU6ICdMb21iYXJkJyB9LFxuICB7IG5hbWU6ICdMb21wb2MnIH0sXG4gIHsgbmFtZTogJ0xvbmcgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0xvbmdtb250JyB9LFxuICB7IG5hbWU6ICdMb25ndmlldycgfSxcbiAgeyBuYW1lOiAnTG9yYWluJyB9LFxuICB7IG5hbWU6ICdMb3MgQW5nZWxlcycgfSxcbiAgeyBuYW1lOiAnTG91aXN2aWxsZS9KZWZmZXJzb24gQ291bnR5JyB9LFxuICB7IG5hbWU6ICdMb3ZlbGFuZCcgfSxcbiAgeyBuYW1lOiAnTG93ZWxsJyB9LFxuICB7IG5hbWU6ICdMdWJib2NrJyB9LFxuICB7IG5hbWU6ICdMeW5jaGJ1cmcnIH0sXG4gIHsgbmFtZTogJ0x5bm4nIH0sXG4gIHsgbmFtZTogJ0x5bndvb2QnIH0sXG4gIHsgbmFtZTogJ01hY29uJyB9LFxuICB7IG5hbWU6ICdNYWRlcmEnIH0sXG4gIHsgbmFtZTogJ01hZGlzb24nIH0sXG4gIHsgbmFtZTogJ01hZGlzb24nIH0sXG4gIHsgbmFtZTogJ01hbGRlbicgfSxcbiAgeyBuYW1lOiAnTWFuYXNzYXMnIH0sXG4gIHsgbmFtZTogJ01hbmNoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ01hbmhhdHRhbicgfSxcbiAgeyBuYW1lOiAnTWFua2F0bycgfSxcbiAgeyBuYW1lOiAnTWFuc2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdNYW5zZmllbGQnIH0sXG4gIHsgbmFtZTogJ01hbnRlY2EnIH0sXG4gIHsgbmFtZTogJ01hcGxlIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdNYXBsZXdvb2QnIH0sXG4gIHsgbmFtZTogJ01hcmFuYScgfSxcbiAgeyBuYW1lOiAnTWFyZ2F0ZScgfSxcbiAgeyBuYW1lOiAnTWFyaWNvcGEnIH0sXG4gIHsgbmFtZTogJ01hcmlldHRhJyB9LFxuICB7IG5hbWU6ICdNYXJsYm9yb3VnaCcgfSxcbiAgeyBuYW1lOiAnTWFydGluZXonIH0sXG4gIHsgbmFtZTogJ01hcnlzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ01jQWxsZW4nIH0sXG4gIHsgbmFtZTogJ01jS2lubmV5JyB9LFxuICB7IG5hbWU6ICdNZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdNZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdNZWxib3VybmUnIH0sXG4gIHsgbmFtZTogJ01lbXBoaXMnIH0sXG4gIHsgbmFtZTogJ01lbmlmZWUnIH0sXG4gIHsgbmFtZTogJ01lbnRvcicgfSxcbiAgeyBuYW1lOiAnTWVyY2VkJyB9LFxuICB7IG5hbWU6ICdNZXJpZGVuJyB9LFxuICB7IG5hbWU6ICdNZXJpZGlhbicgfSxcbiAgeyBuYW1lOiAnTWVyaWRpYW4nIH0sXG4gIHsgbmFtZTogJ01lc2EnIH0sXG4gIHsgbmFtZTogJ01lc3F1aXRlJyB9LFxuICB7IG5hbWU6ICdNZXRodWVuJyB9LFxuICB7IG5hbWU6ICdNaWFtaScgfSxcbiAgeyBuYW1lOiAnTWlhbWkgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ01pYW1pIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ01pZGRsZXRvd24nIH0sXG4gIHsgbmFtZTogJ01pZGRsZXRvd24nIH0sXG4gIHsgbmFtZTogJ01pZGxhbmQnIH0sXG4gIHsgbmFtZTogJ01pZGxhbmQnIH0sXG4gIHsgbmFtZTogJ01pZHdlc3QgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTWlsZm9yZCcgfSxcbiAgeyBuYW1lOiAnTWlscGl0YXMnIH0sXG4gIHsgbmFtZTogJ01pbHdhdWtlZScgfSxcbiAgeyBuYW1lOiAnTWlubmVhcG9saXMnIH0sXG4gIHsgbmFtZTogJ01pbm5ldG9ua2EnIH0sXG4gIHsgbmFtZTogJ01pbm90JyB9LFxuICB7IG5hbWU6ICdNaXJhbWFyJyB9LFxuICB7IG5hbWU6ICdNaXNoYXdha2EnIH0sXG4gIHsgbmFtZTogJ01pc3Npb24nIH0sXG4gIHsgbmFtZTogJ01pc3Npb24gVmllam8nIH0sXG4gIHsgbmFtZTogJ01pc3NvdWxhJyB9LFxuICB7IG5hbWU6ICdNaXNzb3VyaSBDaXR5JyB9LFxuICB7IG5hbWU6ICdNb2JpbGUnIH0sXG4gIHsgbmFtZTogJ01vZGVzdG8nIH0sXG4gIHsgbmFtZTogJ01vbGluZScgfSxcbiAgeyBuYW1lOiAnTW9ucm9lJyB9LFxuICB7IG5hbWU6ICdNb25yb3ZpYScgfSxcbiAgeyBuYW1lOiAnTW9udGNsYWlyJyB9LFxuICB7IG5hbWU6ICdNb250ZWJlbGxvJyB9LFxuICB7IG5hbWU6ICdNb250ZXJleSBQYXJrJyB9LFxuICB7IG5hbWU6ICdNb250Z29tZXJ5JyB9LFxuICB7IG5hbWU6ICdNb29yZScgfSxcbiAgeyBuYW1lOiAnTW9vcmhlYWQnIH0sXG4gIHsgbmFtZTogJ01vcmVubyBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ01vcmdhbiBIaWxsJyB9LFxuICB7IG5hbWU6ICdNb3VudCBQbGVhc2FudCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgUHJvc3BlY3QnIH0sXG4gIHsgbmFtZTogJ01vdW50IFZlcm5vbicgfSxcbiAgeyBuYW1lOiAnTW91bnRhaW4gVmlldycgfSxcbiAgeyBuYW1lOiAnTXVuY2llJyB9LFxuICB7IG5hbWU6ICdNdXJmcmVlc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ011cnJheScgfSxcbiAgeyBuYW1lOiAnTXVycmlldGEnIH0sXG4gIHsgbmFtZTogJ011c2tlZ29uJyB9LFxuICB7IG5hbWU6ICdNdXNrb2dlZScgfSxcbiAgeyBuYW1lOiAnTmFtcGEnIH0sXG4gIHsgbmFtZTogJ05hcGEnIH0sXG4gIHsgbmFtZTogJ05hcGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ05hc2h1YScgfSxcbiAgeyBuYW1lOiAnTmFzaHZpbGxlLURhdmlkc29uJyB9LFxuICB7IG5hbWU6ICdOYXRpb25hbCBDaXR5JyB9LFxuICB7IG5hbWU6ICdOZXcgQmVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnTmV3IEJlcmxpbicgfSxcbiAgeyBuYW1lOiAnTmV3IEJyYXVuZmVscycgfSxcbiAgeyBuYW1lOiAnTmV3IEJyaXRhaW4nIH0sXG4gIHsgbmFtZTogJ05ldyBCcnVuc3dpY2snIH0sXG4gIHsgbmFtZTogJ05ldyBIYXZlbicgfSxcbiAgeyBuYW1lOiAnTmV3IE9ybGVhbnMnIH0sXG4gIHsgbmFtZTogJ05ldyBSb2NoZWxsZScgfSxcbiAgeyBuYW1lOiAnTmV3IFlvcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld3BvcnQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ05ld3BvcnQgTmV3cycgfSxcbiAgeyBuYW1lOiAnTmV3dG9uJyB9LFxuICB7IG5hbWU6ICdOaWFnYXJhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdOb2JsZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTm9yZm9saycgfSxcbiAgeyBuYW1lOiAnTm9ybWFsJyB9LFxuICB7IG5hbWU6ICdOb3JtYW4nIH0sXG4gIHsgbmFtZTogJ05vcnRoIENoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ05vcnRoIExhcyBWZWdhcycgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGF1ZGVyZGFsZScgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGl0dGxlIFJvY2snIH0sXG4gIHsgbmFtZTogJ05vcnRoIE1pYW1pJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBNaWFtaSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTm9ydGggUG9ydCcgfSxcbiAgeyBuYW1lOiAnTm9ydGggUmljaGxhbmQgSGlsbHMnIH0sXG4gIHsgbmFtZTogJ05vcnRoZ2xlbm4nIH0sXG4gIHsgbmFtZTogJ05vcndhbGsnIH0sXG4gIHsgbmFtZTogJ05vcndhbGsnIH0sXG4gIHsgbmFtZTogJ05vcndpY2gnIH0sXG4gIHsgbmFtZTogJ05vdmF0bycgfSxcbiAgeyBuYW1lOiAnTm92aScgfSxcbiAgeyBuYW1lOiAnT1xcJ0ZhbGxvbicgfSxcbiAgeyBuYW1lOiAnT2FrIExhd24nIH0sXG4gIHsgbmFtZTogJ09hayBQYXJrJyB9LFxuICB7IG5hbWU6ICdPYWtsYW5kJyB9LFxuICB7IG5hbWU6ICdPYWtsYW5kIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ha2xleScgfSxcbiAgeyBuYW1lOiAnT2NhbGEnIH0sXG4gIHsgbmFtZTogJ09jZWFuc2lkZScgfSxcbiAgeyBuYW1lOiAnT2NvZWUnIH0sXG4gIHsgbmFtZTogJ09kZXNzYScgfSxcbiAgeyBuYW1lOiAnT2dkZW4nIH0sXG4gIHsgbmFtZTogJ09rbGFob21hIENpdHknIH0sXG4gIHsgbmFtZTogJ09sYXRoZScgfSxcbiAgeyBuYW1lOiAnT2x5bXBpYScgfSxcbiAgeyBuYW1lOiAnT21haGEnIH0sXG4gIHsgbmFtZTogJ09udGFyaW8nIH0sXG4gIHsgbmFtZTogJ09yYW5nZScgfSxcbiAgeyBuYW1lOiAnT3JlbScgfSxcbiAgeyBuYW1lOiAnT3JsYW5kIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ybGFuZG8nIH0sXG4gIHsgbmFtZTogJ09ybW9uZCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnT3JvIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnT3Noa29zaCcgfSxcbiAgeyBuYW1lOiAnT3ZlcmxhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT3dlbnNib3JvJyB9LFxuICB7IG5hbWU6ICdPeG5hcmQnIH0sXG4gIHsgbmFtZTogJ1BhY2lmaWNhJyB9LFxuICB7IG5hbWU6ICdQYWxhdGluZScgfSxcbiAgeyBuYW1lOiAnUGFsbSBCYXknIH0sXG4gIHsgbmFtZTogJ1BhbG0gQmVhY2ggR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnUGFsbSBDb2FzdCcgfSxcbiAgeyBuYW1lOiAnUGFsbSBEZXNlcnQnIH0sXG4gIHsgbmFtZTogJ1BhbG0gU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnUGFsbWRhbGUnIH0sXG4gIHsgbmFtZTogJ1BhbG8gQWx0bycgfSxcbiAgeyBuYW1lOiAnUGFuYW1hIENpdHknIH0sXG4gIHsgbmFtZTogJ1BhcmFtb3VudCcgfSxcbiAgeyBuYW1lOiAnUGFyayBSaWRnZScgfSxcbiAgeyBuYW1lOiAnUGFya2VyJyB9LFxuICB7IG5hbWU6ICdQYXJtYScgfSxcbiAgeyBuYW1lOiAnUGFzYWRlbmEnIH0sXG4gIHsgbmFtZTogJ1Bhc2FkZW5hJyB9LFxuICB7IG5hbWU6ICdQYXNjbycgfSxcbiAgeyBuYW1lOiAnUGFzc2FpYycgfSxcbiAgeyBuYW1lOiAnUGF0ZXJzb24nIH0sXG4gIHsgbmFtZTogJ1Bhd3R1Y2tldCcgfSxcbiAgeyBuYW1lOiAnUGVhYm9keScgfSxcbiAgeyBuYW1lOiAnUGVhY2h0cmVlIENvcm5lcnMnIH0sXG4gIHsgbmFtZTogJ1BlYXJsYW5kJyB9LFxuICB7IG5hbWU6ICdQZW1icm9rZSBQaW5lcycgfSxcbiAgeyBuYW1lOiAnUGVuc2Fjb2xhJyB9LFxuICB7IG5hbWU6ICdQZW9yaWEnIH0sXG4gIHsgbmFtZTogJ1Blb3JpYScgfSxcbiAgeyBuYW1lOiAnUGVycmlzJyB9LFxuICB7IG5hbWU6ICdQZXJ0aCBBbWJveScgfSxcbiAgeyBuYW1lOiAnUGV0YWx1bWEnIH0sXG4gIHsgbmFtZTogJ1BmbHVnZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnUGhhcnInIH0sXG4gIHsgbmFtZTogJ1BoZW5peCBDaXR5JyB9LFxuICB7IG5hbWU6ICdQaGlsYWRlbHBoaWEnIH0sXG4gIHsgbmFtZTogJ1Bob2VuaXgnIH0sXG4gIHsgbmFtZTogJ1BpY28gUml2ZXJhJyB9LFxuICB7IG5hbWU6ICdQaW5lIEJsdWZmJyB9LFxuICB7IG5hbWU6ICdQaW5lbGxhcyBQYXJrJyB9LFxuICB7IG5hbWU6ICdQaXR0c2J1cmcnIH0sXG4gIHsgbmFtZTogJ1BpdHRzYnVyZ2gnIH0sXG4gIHsgbmFtZTogJ1BpdHRzZmllbGQnIH0sXG4gIHsgbmFtZTogJ1BsYWNlbnRpYScgfSxcbiAgeyBuYW1lOiAnUGxhaW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhaW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhbm8nIH0sXG4gIHsgbmFtZTogJ1BsYW50YXRpb24nIH0sXG4gIHsgbmFtZTogJ1BsZWFzYW50b24nIH0sXG4gIHsgbmFtZTogJ1BseW1vdXRoJyB9LFxuICB7IG5hbWU6ICdQb2NhdGVsbG8nIH0sXG4gIHsgbmFtZTogJ1BvbW9uYScgfSxcbiAgeyBuYW1lOiAnUG9tcGFubyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnUG9udGlhYycgfSxcbiAgeyBuYW1lOiAnUG9ydCBBcnRodXInIH0sXG4gIHsgbmFtZTogJ1BvcnQgT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdQb3J0IFN0LiBMdWNpZScgfSxcbiAgeyBuYW1lOiAnUG9ydGFnZScgfSxcbiAgeyBuYW1lOiAnUG9ydGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1BvcnRsYW5kJyB9LFxuICB7IG5hbWU6ICdQb3J0bGFuZCcgfSxcbiAgeyBuYW1lOiAnUG9ydHNtb3V0aCcgfSxcbiAgeyBuYW1lOiAnUG93YXknIH0sXG4gIHsgbmFtZTogJ1ByZXNjb3R0JyB9LFxuICB7IG5hbWU6ICdQcmVzY290dCBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1Byb3ZpZGVuY2UnIH0sXG4gIHsgbmFtZTogJ1Byb3ZvJyB9LFxuICB7IG5hbWU6ICdQdWVibG8nIH0sXG4gIHsgbmFtZTogJ1B1eWFsbHVwJyB9LFxuICB7IG5hbWU6ICdRdWluY3knIH0sXG4gIHsgbmFtZTogJ1F1aW5jeScgfSxcbiAgeyBuYW1lOiAnUmFjaW5lJyB9LFxuICB7IG5hbWU6ICdSYWxlaWdoJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gQ29yZG92YScgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIEN1Y2Ftb25nYScgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIFBhbG9zIFZlcmRlcycgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIFNhbnRhIE1hcmdhcml0YScgfSxcbiAgeyBuYW1lOiAnUmFwaWQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUmVhZGluZycgfSxcbiAgeyBuYW1lOiAnUmVkZGluZycgfSxcbiAgeyBuYW1lOiAnUmVkbGFuZHMnIH0sXG4gIHsgbmFtZTogJ1JlZG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JlZG9uZG8gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1JlZHdvb2QgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUmVubycgfSxcbiAgeyBuYW1lOiAnUmVudG9uJyB9LFxuICB7IG5hbWU6ICdSZXZlcmUnIH0sXG4gIHsgbmFtZTogJ1JpYWx0bycgfSxcbiAgeyBuYW1lOiAnUmljaGFyZHNvbicgfSxcbiAgeyBuYW1lOiAnUmljaGxhbmQnIH0sXG4gIHsgbmFtZTogJ1JpY2htb25kJyB9LFxuICB7IG5hbWU6ICdSaWNobW9uZCcgfSxcbiAgeyBuYW1lOiAnUmlvIFJhbmNobycgfSxcbiAgeyBuYW1lOiAnUml2ZXJzaWRlJyB9LFxuICB7IG5hbWU6ICdSaXZlcnRvbicgfSxcbiAgeyBuYW1lOiAnUm9hbm9rZScgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlciBIaWxscycgfSxcbiAgeyBuYW1lOiAnUm9jayBIaWxsJyB9LFxuICB7IG5hbWU6ICdSb2NrIElzbGFuZCcgfSxcbiAgeyBuYW1lOiAnUm9ja2ZvcmQnIH0sXG4gIHsgbmFtZTogJ1JvY2tsaW4nIH0sXG4gIHsgbmFtZTogJ1JvY2t2aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9ja3dhbGwnIH0sXG4gIHsgbmFtZTogJ1JvY2t5IE1vdW50JyB9LFxuICB7IG5hbWU6ICdSb2dlcnMnIH0sXG4gIHsgbmFtZTogJ1JvaG5lcnQgUGFyaycgfSxcbiAgeyBuYW1lOiAnUm9tZW92aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9zZW1lYWQnIH0sXG4gIHsgbmFtZTogJ1Jvc2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9zZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3N3ZWxsJyB9LFxuICB7IG5hbWU6ICdSb3N3ZWxsJyB9LFxuICB7IG5hbWU6ICdSb3VuZCBSb2NrJyB9LFxuICB7IG5hbWU6ICdSb3dsZXR0JyB9LFxuICB7IG5hbWU6ICdSb3knIH0sXG4gIHsgbmFtZTogJ1JveWFsIE9haycgfSxcbiAgeyBuYW1lOiAnU2FjcmFtZW50bycgfSxcbiAgeyBuYW1lOiAnU2FnaW5hdycgfSxcbiAgeyBuYW1lOiAnU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1NhbGVtJyB9LFxuICB7IG5hbWU6ICdTYWxpbmEnIH0sXG4gIHsgbmFtZTogJ1NhbGluYXMnIH0sXG4gIHsgbmFtZTogJ1NhbHQgTGFrZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdTYW1tYW1pc2gnIH0sXG4gIHsgbmFtZTogJ1NhbiBBbmdlbG8nIH0sXG4gIHsgbmFtZTogJ1NhbiBBbnRvbmlvJyB9LFxuICB7IG5hbWU6ICdTYW4gQmVybmFyZGlubycgfSxcbiAgeyBuYW1lOiAnU2FuIEJydW5vJyB9LFxuICB7IG5hbWU6ICdTYW4gQnVlbmF2ZW50dXJhIChWZW50dXJhKScgfSxcbiAgeyBuYW1lOiAnU2FuIENsZW1lbnRlJyB9LFxuICB7IG5hbWU6ICdTYW4gRGllZ28nIH0sXG4gIHsgbmFtZTogJ1NhbiBGcmFuY2lzY28nIH0sXG4gIHsgbmFtZTogJ1NhbiBHYWJyaWVsJyB9LFxuICB7IG5hbWU6ICdTYW4gSmFjaW50bycgfSxcbiAgeyBuYW1lOiAnU2FuIEpvc2UnIH0sXG4gIHsgbmFtZTogJ1NhbiBMZWFuZHJvJyB9LFxuICB7IG5hbWU6ICdTYW4gTHVpcyBPYmlzcG8nIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXJjb3MnIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXJjb3MnIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXRlbycgfSxcbiAgeyBuYW1lOiAnU2FuIFJhZmFlbCcgfSxcbiAgeyBuYW1lOiAnU2FuIFJhbW9uJyB9LFxuICB7IG5hbWU6ICdTYW5keScgfSxcbiAgeyBuYW1lOiAnU2FuZHkgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnU2FuZm9yZCcgfSxcbiAgeyBuYW1lOiAnU2FudGEgQW5hJyB9LFxuICB7IG5hbWU6ICdTYW50YSBCYXJiYXJhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDbGFyYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQ2xhcml0YScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQ3J1eicgfSxcbiAgeyBuYW1lOiAnU2FudGEgRmUnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIE1hcmlhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBNb25pY2EnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIFJvc2EnIH0sXG4gIHsgbmFtZTogJ1NhbnRlZScgfSxcbiAgeyBuYW1lOiAnU2FyYXNvdGEnIH0sXG4gIHsgbmFtZTogJ1NhdmFubmFoJyB9LFxuICB7IG5hbWU6ICdTYXlyZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdTY2hhdW1idXJnJyB9LFxuICB7IG5hbWU6ICdTY2hlbmVjdGFkeScgfSxcbiAgeyBuYW1lOiAnU2NvdHRzZGFsZScgfSxcbiAgeyBuYW1lOiAnU2NyYW50b24nIH0sXG4gIHsgbmFtZTogJ1NlYXR0bGUnIH0sXG4gIHsgbmFtZTogJ1NoYWtvcGVlJyB9LFxuICB7IG5hbWU6ICdTaGF3bmVlJyB9LFxuICB7IG5hbWU6ICdTaGVib3lnYW4nIH0sXG4gIHsgbmFtZTogJ1NoZWx0b24nIH0sXG4gIHsgbmFtZTogJ1NoZXJtYW4nIH0sXG4gIHsgbmFtZTogJ1Nob3JlbGluZScgfSxcbiAgeyBuYW1lOiAnU2hyZXZlcG9ydCcgfSxcbiAgeyBuYW1lOiAnU2llcnJhIFZpc3RhJyB9LFxuICB7IG5hbWU6ICdTaW1pIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnU2lvdXggQ2l0eScgfSxcbiAgeyBuYW1lOiAnU2lvdXggRmFsbHMnIH0sXG4gIHsgbmFtZTogJ1Nrb2tpZScgfSxcbiAgeyBuYW1lOiAnU215cm5hJyB9LFxuICB7IG5hbWU6ICdTbXlybmEnIH0sXG4gIHsgbmFtZTogJ1NvbWVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEJlbmQnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEdhdGUnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEpvcmRhbicgfSxcbiAgeyBuYW1lOiAnU291dGggU2FuIEZyYW5jaXNjbycgfSxcbiAgeyBuYW1lOiAnU291dGhhdmVuJyB9LFxuICB7IG5hbWU6ICdTb3V0aGZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcGFuaXNoIEZvcmsnIH0sXG4gIHsgbmFtZTogJ1NwYXJrcycgfSxcbiAgeyBuYW1lOiAnU3BhcnRhbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ1Nwb2thbmUnIH0sXG4gIHsgbmFtZTogJ1Nwb2thbmUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdTcHJpbmdkYWxlJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1N0LiBDaGFybGVzJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2xhaXIgU2hvcmVzJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2xvdWQnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbG91ZCcgfSxcbiAgeyBuYW1lOiAnU3QuIEdlb3JnZScgfSxcbiAgeyBuYW1lOiAnU3QuIEpvc2VwaCcgfSxcbiAgeyBuYW1lOiAnU3QuIExvdWlzJyB9LFxuICB7IG5hbWU6ICdTdC4gTG91aXMgUGFyaycgfSxcbiAgeyBuYW1lOiAnU3QuIFBhdWwnIH0sXG4gIHsgbmFtZTogJ1N0LiBQZXRlcnMnIH0sXG4gIHsgbmFtZTogJ1N0LiBQZXRlcnNidXJnJyB9LFxuICB7IG5hbWU6ICdTdGFtZm9yZCcgfSxcbiAgeyBuYW1lOiAnU3RhbnRvbicgfSxcbiAgeyBuYW1lOiAnU3RhdGUgQ29sbGVnZScgfSxcbiAgeyBuYW1lOiAnU3RlcmxpbmcgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnU3RpbGx3YXRlcicgfSxcbiAgeyBuYW1lOiAnU3RvY2t0b24nIH0sXG4gIHsgbmFtZTogJ1N0cmVhbXdvb2QnIH0sXG4gIHsgbmFtZTogJ1N0cm9uZ3N2aWxsZScgfSxcbiAgeyBuYW1lOiAnU3VmZm9saycgfSxcbiAgeyBuYW1lOiAnU3VnYXIgTGFuZCcgfSxcbiAgeyBuYW1lOiAnU3VtbWVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1N1bXRlcicgfSxcbiAgeyBuYW1lOiAnU3Vubnl2YWxlJyB9LFxuICB7IG5hbWU6ICdTdW5yaXNlJyB9LFxuICB7IG5hbWU6ICdTdXJwcmlzZScgfSxcbiAgeyBuYW1lOiAnU3lyYWN1c2UnIH0sXG4gIHsgbmFtZTogJ1RhY29tYScgfSxcbiAgeyBuYW1lOiAnVGFsbGFoYXNzZWUnIH0sXG4gIHsgbmFtZTogJ1RhbWFyYWMnIH0sXG4gIHsgbmFtZTogJ1RhbXBhJyB9LFxuICB7IG5hbWU6ICdUYXVudG9uJyB9LFxuICB7IG5hbWU6ICdUYXlsb3InIH0sXG4gIHsgbmFtZTogJ1RheWxvcnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnVGVtZWN1bGEnIH0sXG4gIHsgbmFtZTogJ1RlbXBlJyB9LFxuICB7IG5hbWU6ICdUZW1wbGUnIH0sXG4gIHsgbmFtZTogJ1RlcnJlIEhhdXRlJyB9LFxuICB7IG5hbWU6ICdUZXhhcmthbmEnIH0sXG4gIHsgbmFtZTogJ1RleGFzIENpdHknIH0sXG4gIHsgbmFtZTogJ1RoZSBDb2xvbnknIH0sXG4gIHsgbmFtZTogJ1Rob3JudG9uJyB9LFxuICB7IG5hbWU6ICdUaG91c2FuZCBPYWtzJyB9LFxuICB7IG5hbWU6ICdUaWdhcmQnIH0sXG4gIHsgbmFtZTogJ1RpbmxleSBQYXJrJyB9LFxuICB7IG5hbWU6ICdUaXR1c3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdUb2xlZG8nIH0sXG4gIHsgbmFtZTogJ1RvcGVrYScgfSxcbiAgeyBuYW1lOiAnVG9ycmFuY2UnIH0sXG4gIHsgbmFtZTogJ1RyYWN5JyB9LFxuICB7IG5hbWU6ICdUcmVudG9uJyB9LFxuICB7IG5hbWU6ICdUcm95JyB9LFxuICB7IG5hbWU6ICdUcm95JyB9LFxuICB7IG5hbWU6ICdUdWNzb24nIH0sXG4gIHsgbmFtZTogJ1R1bGFyZScgfSxcbiAgeyBuYW1lOiAnVHVsc2EnIH0sXG4gIHsgbmFtZTogJ1R1cmxvY2snIH0sXG4gIHsgbmFtZTogJ1R1c2NhbG9vc2EnIH0sXG4gIHsgbmFtZTogJ1R1c3RpbicgfSxcbiAgeyBuYW1lOiAnVHdpbiBGYWxscycgfSxcbiAgeyBuYW1lOiAnVHlsZXInIH0sXG4gIHsgbmFtZTogJ1VuaW9uIENpdHknIH0sXG4gIHsgbmFtZTogJ1VuaW9uIENpdHknIH0sXG4gIHsgbmFtZTogJ1VwbGFuZCcgfSxcbiAgeyBuYW1lOiAnVXJiYW5hJyB9LFxuICB7IG5hbWU6ICdVcmJhbmRhbGUnIH0sXG4gIHsgbmFtZTogJ1V0aWNhJyB9LFxuICB7IG5hbWU6ICdWYWNhdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1ZhbGRvc3RhJyB9LFxuICB7IG5hbWU6ICdWYWxsZWpvJyB9LFxuICB7IG5hbWU6ICdWYWxsZXkgU3RyZWFtJyB9LFxuICB7IG5hbWU6ICdWYW5jb3V2ZXInIH0sXG4gIHsgbmFtZTogJ1ZpY3RvcmlhJyB9LFxuICB7IG5hbWU6ICdWaWN0b3J2aWxsZScgfSxcbiAgeyBuYW1lOiAnVmluZWxhbmQnIH0sXG4gIHsgbmFtZTogJ1ZpcmdpbmlhIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdWaXNhbGlhJyB9LFxuICB7IG5hbWU6ICdWaXN0YScgfSxcbiAgeyBuYW1lOiAnV2FjbycgfSxcbiAgeyBuYW1lOiAnV2FsbnV0IENyZWVrJyB9LFxuICB7IG5hbWU6ICdXYWx0aGFtJyB9LFxuICB7IG5hbWU6ICdXYXJuZXIgUm9iaW5zJyB9LFxuICB7IG5hbWU6ICdXYXJyZW4nIH0sXG4gIHsgbmFtZTogJ1dhcnJlbicgfSxcbiAgeyBuYW1lOiAnV2Fyd2ljaycgfSxcbiAgeyBuYW1lOiAnV2FzaGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2F0ZXJidXJ5JyB9LFxuICB7IG5hbWU6ICdXYXRlcmxvbycgfSxcbiAgeyBuYW1lOiAnV2F0c29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ1dhdWtlZ2FuJyB9LFxuICB7IG5hbWU6ICdXYXVrZXNoYScgfSxcbiAgeyBuYW1lOiAnV2F1c2F1JyB9LFxuICB7IG5hbWU6ICdXYXV3YXRvc2EnIH0sXG4gIHsgbmFtZTogJ1dlbGxpbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dlc2xhY28nIH0sXG4gIHsgbmFtZTogJ1dlc3QgQWxsaXMnIH0sXG4gIHsgbmFtZTogJ1dlc3QgQ292aW5hJyB9LFxuICB7IG5hbWU6ICdXZXN0IERlcyBNb2luZXMnIH0sXG4gIHsgbmFtZTogJ1dlc3QgSGF2ZW4nIH0sXG4gIHsgbmFtZTogJ1dlc3QgSm9yZGFuJyB9LFxuICB7IG5hbWU6ICdXZXN0IE5ldyBZb3JrJyB9LFxuICB7IG5hbWU6ICdXZXN0IFBhbG0gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1dlc3QgU2FjcmFtZW50bycgfSxcbiAgeyBuYW1lOiAnV2VzdCBWYWxsZXkgQ2l0eScgfSxcbiAgeyBuYW1lOiAnV2VzdGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1dlc3RmaWVsZCcgfSxcbiAgeyBuYW1lOiAnV2VzdGxhbmQnIH0sXG4gIHsgbmFtZTogJ1dlc3RtaW5zdGVyJyB9LFxuICB7IG5hbWU6ICdXZXN0bWluc3RlcicgfSxcbiAgeyBuYW1lOiAnV2VzdG9uJyB9LFxuICB7IG5hbWU6ICdXZXltb3V0aCBUb3duJyB9LFxuICB7IG5hbWU6ICdXaGVhdG9uJyB9LFxuICB7IG5hbWU6ICdXaGVlbGluZycgfSxcbiAgeyBuYW1lOiAnV2hpdGUgUGxhaW5zJyB9LFxuICB7IG5hbWU6ICdXaGl0dGllcicgfSxcbiAgeyBuYW1lOiAnV2ljaGl0YScgfSxcbiAgeyBuYW1lOiAnV2ljaGl0YSBGYWxscycgfSxcbiAgeyBuYW1lOiAnV2lsa2VzLUJhcnJlJyB9LFxuICB7IG5hbWU6ICdXaWxtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXaWxtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXaWxzb24nIH0sXG4gIHsgbmFtZTogJ1dpbnN0b24tU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1dpbnRlciBHYXJkZW4nIH0sXG4gIHsgbmFtZTogJ1dvYnVybicgfSxcbiAgeyBuYW1lOiAnV29vZGJ1cnknIH0sXG4gIHsgbmFtZTogJ1dvb2RsYW5kJyB9LFxuICB7IG5hbWU6ICdXb29uc29ja2V0JyB9LFxuICB7IG5hbWU6ICdXb3JjZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1d5bGllJyB9LFxuICB7IG5hbWU6ICdXeW9taW5nJyB9LFxuICB7IG5hbWU6ICdZYWtpbWEnIH0sXG4gIHsgbmFtZTogJ1lvbmtlcnMnIH0sXG4gIHsgbmFtZTogJ1lvcmJhIExpbmRhJyB9LFxuICB7IG5hbWU6ICdZb3JrJyB9LFxuICB7IG5hbWU6ICdZb3VuZ3N0b3duJyB9LFxuICB7IG5hbWU6ICdZdWJhIENpdHknIH0sXG4gIHsgbmFtZTogJ1l1Y2FpcGEnIH0sXG4gIHsgbmFtZTogJ1l1bWEnIH1cbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcblx0eyBnaXRodWI6ICdqZWR3YXRzb24nLCBuYW1lOiAnSmVkIFdhdHNvbicgfSxcblx0eyBnaXRodWI6ICdicnVkZXJzdGVpbicsIG5hbWU6ICdEYXZlIEJyb3RoZXJzdG9uZScgfSxcblx0eyBnaXRodWI6ICdqb3NzbWFjJywgbmFtZTogJ0pvc3MgTWFja2lzb24nIH0sXG5cdHsgZ2l0aHViOiAnam5pZWNoY2lhbCcsIG5hbWU6ICdKYWt1YiBOaWVjaGNpYcWCJyB9LFxuXHR7IGdpdGh1YjogJ2NyYWlnZGFsbGltb3JlJywgbmFtZTogJ0NyYWlnIERhbGxpbW9yZScgfSxcblx0eyBnaXRodWI6ICdqdWxlbicsIG5hbWU6ICdKdWxlbiBSdWl6IEFpenB1cnUnIH0sXG5cdHsgZ2l0aHViOiAnZGNvdXNlbnMnLCBuYW1lOiAnRGFuaWVsIENvdXNlbnMnIH0sXG5cdHsgZ2l0aHViOiAnamdhdXRzY2gnLCBuYW1lOiAnSm9uIEdhdXRzY2gnIH0sXG5cdHsgZ2l0aHViOiAnZG1pdHJ5LXNtaXJub3YnLCBuYW1lOiAnRG1pdHJ5IFNtaXJub3YnIH0sXG5dO1xuIiwiZXhwb3J0cy5BVSA9IFtcblx0eyB2YWx1ZTogJ2F1c3RyYWxpYW4tY2FwaXRhbC10ZXJyaXRvcnknLCBsYWJlbDogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknLCBjbGFzc05hbWU6ICdTdGF0ZS1BQ1QnIH0sXG5cdHsgdmFsdWU6ICduZXctc291dGgtd2FsZXMnLCBsYWJlbDogJ05ldyBTb3V0aCBXYWxlcycsIGNsYXNzTmFtZTogJ1N0YXRlLU5TVycgfSxcblx0eyB2YWx1ZTogJ3ZpY3RvcmlhJywgbGFiZWw6ICdWaWN0b3JpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVZpYycgfSxcblx0eyB2YWx1ZTogJ3F1ZWVuc2xhbmQnLCBsYWJlbDogJ1F1ZWVuc2xhbmQnLCBjbGFzc05hbWU6ICdTdGF0ZS1RbGQnIH0sXG5cdHsgdmFsdWU6ICd3ZXN0ZXJuLWF1c3RyYWxpYScsIGxhYmVsOiAnV2VzdGVybiBBdXN0cmFsaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1XQScgfSxcblx0eyB2YWx1ZTogJ3NvdXRoLWF1c3RyYWxpYScsIGxhYmVsOiAnU291dGggQXVzdHJhbGlhJywgY2xhc3NOYW1lOiAnU3RhdGUtU0EnIH0sXG5cdHsgdmFsdWU6ICd0YXNtYW5pYScsIGxhYmVsOiAnVGFzbWFuaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1UYXMnIH0sXG5cdHsgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknLCBsYWJlbDogJ05vcnRoZXJuIFRlcnJpdG9yeScsIGNsYXNzTmFtZTogJ1N0YXRlLU5UJyB9LFxuXTtcblxuZXhwb3J0cy5VUyA9IFtcbiAgICB7IHZhbHVlOiAnQUwnLCBsYWJlbDogJ0FsYWJhbWEnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuICAgIHsgdmFsdWU6ICdBSycsIGxhYmVsOiAnQWxhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdBUycsIGxhYmVsOiAnQW1lcmljYW4gU2Ftb2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FaJywgbGFiZWw6ICdBcml6b25hJyB9LFxuICAgIHsgdmFsdWU6ICdBUicsIGxhYmVsOiAnQXJrYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0NBJywgbGFiZWw6ICdDYWxpZm9ybmlhJyB9LFxuICAgIHsgdmFsdWU6ICdDTycsIGxhYmVsOiAnQ29sb3JhZG8nIH0sXG4gICAgeyB2YWx1ZTogJ0NUJywgbGFiZWw6ICdDb25uZWN0aWN1dCcgfSxcbiAgICB7IHZhbHVlOiAnREUnLCBsYWJlbDogJ0RlbGF3YXJlJyB9LFxuICAgIHsgdmFsdWU6ICdEQycsIGxhYmVsOiAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZNJywgbGFiZWw6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZMJywgbGFiZWw6ICdGbG9yaWRhJyB9LFxuICAgIHsgdmFsdWU6ICdHQScsIGxhYmVsOiAnR2VvcmdpYScgfSxcbiAgICB7IHZhbHVlOiAnR1UnLCBsYWJlbDogJ0d1YW0nIH0sXG4gICAgeyB2YWx1ZTogJ0hJJywgbGFiZWw6ICdIYXdhaWknIH0sXG4gICAgeyB2YWx1ZTogJ0lEJywgbGFiZWw6ICdJZGFobycgfSxcbiAgICB7IHZhbHVlOiAnSUwnLCBsYWJlbDogJ0lsbGlub2lzJyB9LFxuICAgIHsgdmFsdWU6ICdJTicsIGxhYmVsOiAnSW5kaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnSUEnLCBsYWJlbDogJ0lvd2EnIH0sXG4gICAgeyB2YWx1ZTogJ0tTJywgbGFiZWw6ICdLYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0tZJywgbGFiZWw6ICdLZW50dWNreScgfSxcbiAgICB7IHZhbHVlOiAnTEEnLCBsYWJlbDogJ0xvdWlzaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnTUUnLCBsYWJlbDogJ01haW5lJyB9LFxuICAgIHsgdmFsdWU6ICdNSCcsIGxhYmVsOiAnTWFyc2hhbGwgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnTUQnLCBsYWJlbDogJ01hcnlsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdNQScsIGxhYmVsOiAnTWFzc2FjaHVzZXR0cycgfSxcbiAgICB7IHZhbHVlOiAnTUknLCBsYWJlbDogJ01pY2hpZ2FuJyB9LFxuICAgIHsgdmFsdWU6ICdNTicsIGxhYmVsOiAnTWlubmVzb3RhJyB9LFxuICAgIHsgdmFsdWU6ICdNUycsIGxhYmVsOiAnTWlzc2lzc2lwcGknIH0sXG4gICAgeyB2YWx1ZTogJ01PJywgbGFiZWw6ICdNaXNzb3VyaScgfSxcbiAgICB7IHZhbHVlOiAnTVQnLCBsYWJlbDogJ01vbnRhbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05FJywgbGFiZWw6ICdOZWJyYXNrYScgfSxcbiAgICB7IHZhbHVlOiAnTlYnLCBsYWJlbDogJ05ldmFkYScgfSxcbiAgICB7IHZhbHVlOiAnTkgnLCBsYWJlbDogJ05ldyBIYW1wc2hpcmUnIH0sXG4gICAgeyB2YWx1ZTogJ05KJywgbGFiZWw6ICdOZXcgSmVyc2V5JyB9LFxuICAgIHsgdmFsdWU6ICdOTScsIGxhYmVsOiAnTmV3IE1leGljbycgfSxcbiAgICB7IHZhbHVlOiAnTlknLCBsYWJlbDogJ05ldyBZb3JrJyB9LFxuICAgIHsgdmFsdWU6ICdOQycsIGxhYmVsOiAnTm9ydGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05EJywgbGFiZWw6ICdOb3J0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01QJywgbGFiZWw6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ09IJywgbGFiZWw6ICdPaGlvJyB9LFxuICAgIHsgdmFsdWU6ICdPSycsIGxhYmVsOiAnT2tsYWhvbWEnIH0sXG4gICAgeyB2YWx1ZTogJ09SJywgbGFiZWw6ICdPcmVnb24nIH0sXG4gICAgeyB2YWx1ZTogJ1BXJywgbGFiZWw6ICdQYWxhdScgfSxcbiAgICB7IHZhbHVlOiAnUEEnLCBsYWJlbDogJ1Blbm5zeWx2YW5pYScgfSxcbiAgICB7IHZhbHVlOiAnUFInLCBsYWJlbDogJ1B1ZXJ0byBSaWNvJyB9LFxuICAgIHsgdmFsdWU6ICdSSScsIGxhYmVsOiAnUmhvZGUgSXNsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdTQycsIGxhYmVsOiAnU291dGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ1NEJywgbGFiZWw6ICdTb3V0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ1ROJywgbGFiZWw6ICdUZW5uZXNzZWUnIH0sXG4gICAgeyB2YWx1ZTogJ1RYJywgbGFiZWw6ICdUZXhhcycgfSxcbiAgICB7IHZhbHVlOiAnVVQnLCBsYWJlbDogJ1V0YWgnIH0sXG4gICAgeyB2YWx1ZTogJ1ZUJywgbGFiZWw6ICdWZXJtb250JyB9LFxuICAgIHsgdmFsdWU6ICdWSScsIGxhYmVsOiAnVmlyZ2luIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ1ZBJywgbGFiZWw6ICdWaXJnaW5pYScgfSxcbiAgICB7IHZhbHVlOiAnV0EnLCBsYWJlbDogJ1dhc2hpbmd0b24nIH0sXG4gICAgeyB2YWx1ZTogJ1dWJywgbGFiZWw6ICdXZXN0IFZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXSScsIGxhYmVsOiAnV2lzY29uc2luJyB9LFxuICAgIHsgdmFsdWU6ICdXWScsIGxhYmVsOiAnV3lvbWluZycgfSxcbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcblx0eyB2YWx1ZTogJ0pvaG4gU21pdGgnLCBsYWJlbDogJ0pvaG4gU21pdGgnLCBlbWFpbDogJ2pvaG5Ac21pdGguY29tJyB9LFxuXHR7IHZhbHVlOiAnTWVycnkgSmFuZScsIGxhYmVsOiAnTWVycnkgSmFuZScsIGVtYWlsOiAnbWVycnlAamFuZS5jb20nIH0sXG5cdHsgdmFsdWU6ICdTdGFuIEhvcGVyJywgbGFiZWw6ICdTdGFuIEhvcGVyJywgZW1haWw6ICdzdGFuQGhvcGVyLmNvbScgfVxuXTtcbiIsInZhciBjaGFyZW5jID0ge1xuICAvLyBVVEYtOCBlbmNvZGluZ1xuICB1dGY4OiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHJldHVybiBjaGFyZW5jLmJpbi5zdHJpbmdUb0J5dGVzKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGNoYXJlbmMuYmluLmJ5dGVzVG9TdHJpbmcoYnl0ZXMpKSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEJpbmFyeSBlbmNvZGluZ1xuICBiaW46IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspXG4gICAgICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgc3RyID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHN0ci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pKTtcbiAgICAgIHJldHVybiBzdHIuam9pbignJyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJlbmM7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBiYXNlNjRtYXBcbiAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nLFxuXG4gIGNyeXB0ID0ge1xuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIGxlZnRcbiAgICByb3RsOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgYikgfCAobiA+Pj4gKDMyIC0gYikpO1xuICAgIH0sXG5cbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiByaWdodFxuICAgIHJvdHI6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCAoMzIgLSBiKSkgfCAobiA+Pj4gYik7XG4gICAgfSxcblxuICAgIC8vIFN3YXAgYmlnLWVuZGlhbiB0byBsaXR0bGUtZW5kaWFuIGFuZCB2aWNlIHZlcnNhXG4gICAgZW5kaWFuOiBmdW5jdGlvbihuKSB7XG4gICAgICAvLyBJZiBudW1iZXIgZ2l2ZW4sIHN3YXAgZW5kaWFuXG4gICAgICBpZiAobi5jb25zdHJ1Y3RvciA9PSBOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0LnJvdGwobiwgOCkgJiAweDAwRkYwMEZGIHwgY3J5cHQucm90bChuLCAyNCkgJiAweEZGMDBGRjAwO1xuICAgICAgfVxuXG4gICAgICAvLyBFbHNlLCBhc3N1bWUgYXJyYXkgYW5kIHN3YXAgYWxsIGl0ZW1zXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOyBpKyspXG4gICAgICAgIG5baV0gPSBjcnlwdC5lbmRpYW4obltpXSk7XG4gICAgICByZXR1cm4gbjtcbiAgICB9LFxuXG4gICAgLy8gR2VuZXJhdGUgYW4gYXJyYXkgb2YgYW55IGxlbmd0aCBvZiByYW5kb20gYnl0ZXNcbiAgICByYW5kb21CeXRlczogZnVuY3Rpb24obikge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXTsgbiA+IDA7IG4tLSlcbiAgICAgICAgYnl0ZXMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYmlnLWVuZGlhbiAzMi1iaXQgd29yZHNcbiAgICBieXRlc1RvV29yZHM6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciB3b3JkcyA9IFtdLCBpID0gMCwgYiA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKywgYiArPSA4KVxuICAgICAgICB3b3Jkc1tiID4+PiA1XSB8PSBieXRlc1tpXSA8PCAoMjQgLSBiICUgMzIpO1xuICAgICAgcmV0dXJuIHdvcmRzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGJpZy1lbmRpYW4gMzItYml0IHdvcmRzIHRvIGEgYnl0ZSBhcnJheVxuICAgIHdvcmRzVG9CeXRlczogZnVuY3Rpb24od29yZHMpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGIgPSAwOyBiIDwgd29yZHMubGVuZ3RoICogMzI7IGIgKz0gOClcbiAgICAgICAgYnl0ZXMucHVzaCgod29yZHNbYiA+Pj4gNV0gPj4+ICgyNCAtIGIgJSAzMikpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgaGV4IHN0cmluZ1xuICAgIGJ5dGVzVG9IZXg6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBoZXggPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSAmIDB4RikudG9TdHJpbmcoMTYpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoZXguam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBoZXggc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGhleFRvQnl0ZXM6IGZ1bmN0aW9uKGhleCkge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYyA9IDA7IGMgPCBoZXgubGVuZ3RoOyBjICs9IDIpXG4gICAgICAgIGJ5dGVzLnB1c2gocGFyc2VJbnQoaGV4LnN1YnN0cihjLCAyKSwgMTYpKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBiYXNlLTY0IHN0cmluZ1xuICAgIGJ5dGVzVG9CYXNlNjQ6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBiYXNlNjQgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB2YXIgdHJpcGxldCA9IChieXRlc1tpXSA8PCAxNikgfCAoYnl0ZXNbaSArIDFdIDw8IDgpIHwgYnl0ZXNbaSArIDJdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKylcbiAgICAgICAgICBpZiAoaSAqIDggKyBqICogNiA8PSBieXRlcy5sZW5ndGggKiA4KVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goYmFzZTY0bWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gNiAqICgzIC0gaikpICYgMHgzRikpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKCc9Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYmFzZTY0LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYmFzZS02NCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgYmFzZTY0VG9CeXRlczogZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgICAvLyBSZW1vdmUgbm9uLWJhc2UtNjQgY2hhcmFjdGVyc1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnJlcGxhY2UoL1teQS1aMC05K1xcL10vaWcsICcnKTtcblxuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgaSA9IDAsIGltb2Q0ID0gMDsgaSA8IGJhc2U2NC5sZW5ndGg7XG4gICAgICAgICAgaW1vZDQgPSArK2kgJSA0KSB7XG4gICAgICAgIGlmIChpbW9kNCA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgYnl0ZXMucHVzaCgoKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSAtIDEpKVxuICAgICAgICAgICAgJiAoTWF0aC5wb3coMiwgLTIgKiBpbW9kNCArIDgpIC0gMSkpIDw8IChpbW9kNCAqIDIpKVxuICAgICAgICAgICAgfCAoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpKSkgPj4+ICg2IC0gaW1vZDQgKiAyKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGNyeXB0O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCcuL2luRE9NJyk7XG5cbnZhciBzaXplO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyZWNhbGMpIHtcbiAgaWYgKCFzaXplIHx8IHJlY2FsYykge1xuICAgIGlmIChjYW5Vc2VET00pIHtcbiAgICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS50b3AgPSAnLTk5OTlweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgIHNpemUgPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICogXG4gKi9cblxuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIC8vIEFkZGVkIHRoZSBub256ZXJvIHkgY2hlY2sgdG8gbWFrZSBGbG93IGhhcHB5LCBidXQgaXQgaXMgcmVkdW5kYW50XG4gICAgcmV0dXJuIHggIT09IDAgfHwgeSAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7IiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lZGlhUXVlcnk7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgIG1lZGlhUXVlcnkgPSBcIigtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDUvNCksIChtaW4tcmVzb2x1dGlvbjogMS4yNWRwcHgpXCI7XG4gICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMS4yNSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShtZWRpYVF1ZXJ5KS5tYXRjaGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIi8vIHRoZSB3aGF0d2ctZmV0Y2ggcG9seWZpbGwgaW5zdGFsbHMgdGhlIGZldGNoKCkgZnVuY3Rpb25cbi8vIG9uIHRoZSBnbG9iYWwgb2JqZWN0ICh3aW5kb3cgb3Igc2VsZilcbi8vXG4vLyBSZXR1cm4gdGhhdCBhcyB0aGUgZXhwb3J0IGZvciB1c2UgaW4gV2VicGFjaywgQnJvd3NlcmlmeSBldGMuXG5yZXF1aXJlKCd3aGF0d2ctZmV0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gc2VsZi5mZXRjaC5iaW5kKHNlbGYpO1xuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNyeXB0ID0gcmVxdWlyZSgnY3J5cHQnKSxcclxuICAgICAgdXRmOCA9IHJlcXVpcmUoJ2NoYXJlbmMnKS51dGY4LFxyXG4gICAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpLFxyXG4gICAgICBiaW4gPSByZXF1aXJlKCdjaGFyZW5jJykuYmluLFxyXG5cclxuICAvLyBUaGUgY29yZVxyXG4gIG1kNSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAvLyBDb252ZXJ0IHRvIGJ5dGUgYXJyYXlcclxuICAgIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09IFN0cmluZylcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGluZyA9PT0gJ2JpbmFyeScpXHJcbiAgICAgICAgbWVzc2FnZSA9IGJpbi5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgbWVzc2FnZSA9IHV0Zjguc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgIGVsc2UgaWYgKGlzQnVmZmVyKG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZSwgMCk7XHJcbiAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIC8vIGVsc2UsIGFzc3VtZSBieXRlIGFycmF5IGFscmVhZHlcclxuXHJcbiAgICB2YXIgbSA9IGNyeXB0LmJ5dGVzVG9Xb3JkcyhtZXNzYWdlKSxcclxuICAgICAgICBsID0gbWVzc2FnZS5sZW5ndGggKiA4LFxyXG4gICAgICAgIGEgPSAgMTczMjU4NDE5MyxcclxuICAgICAgICBiID0gLTI3MTczMzg3OSxcclxuICAgICAgICBjID0gLTE3MzI1ODQxOTQsXHJcbiAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gICAgLy8gU3dhcCBlbmRpYW5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtW2ldID0gKChtW2ldIDw8ICA4KSB8IChtW2ldID4+PiAyNCkpICYgMHgwMEZGMDBGRiB8XHJcbiAgICAgICAgICAgICAoKG1baV0gPDwgMjQpIHwgKG1baV0gPj4+ICA4KSkgJiAweEZGMDBGRjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhZGRpbmdcclxuICAgIG1bbCA+Pj4gNV0gfD0gMHg4MCA8PCAobCAlIDMyKTtcclxuICAgIG1bKCgobCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsO1xyXG5cclxuICAgIC8vIE1ldGhvZCBzaG9ydGN1dHNcclxuICAgIHZhciBGRiA9IG1kNS5fZmYsXHJcbiAgICAgICAgR0cgPSBtZDUuX2dnLFxyXG4gICAgICAgIEhIID0gbWQ1Ll9oaCxcclxuICAgICAgICBJSSA9IG1kNS5faWk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xyXG5cclxuICAgICAgdmFyIGFhID0gYSxcclxuICAgICAgICAgIGJiID0gYixcclxuICAgICAgICAgIGNjID0gYyxcclxuICAgICAgICAgIGRkID0gZDtcclxuXHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDBdLCAgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDcsIC0xNzY0MTg4OTcpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgOF0sICA3LCAgMTc3MDAzNTQxNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDcsICAxODA0NjAzNjgyKTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyAxXSwgIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyA2XSwgIDksIC0xMDY5NTAxNjMyKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgNV0sICA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxMF0sICA5LCAgMzgwMTYwODMpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA5XSwgIDUsICA1Njg0NDY0MzgpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzE0XSwgIDksIC0xMDE5ODAzNjkwKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyAyXSwgIDksIC01MTQwMzc4NCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDVdLCAgNCwgLTM3ODU1OCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKzEzXSwgIDQsICA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDYsIC0xOTg2MzA4NDQpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgNF0sICA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gKGEgKyBhYSkgPj4+IDA7XHJcbiAgICAgIGIgPSAoYiArIGJiKSA+Pj4gMDtcclxuICAgICAgYyA9IChjICsgY2MpID4+PiAwO1xyXG4gICAgICBkID0gKGQgKyBkZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyeXB0LmVuZGlhbihbYSwgYiwgYywgZF0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEF1eGlsaWFyeSBmdW5jdGlvbnNcclxuICBtZDUuX2ZmICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGMgfCB+YiAmIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2dnICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGQgfCBjICYgfmQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2hoICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9paSAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG5cclxuICAvLyBQYWNrYWdlIHByaXZhdGUgYmxvY2tzaXplXHJcbiAgbWQ1Ll9ibG9ja3NpemUgPSAxNjtcclxuICBtZDUuX2RpZ2VzdHNpemUgPSAxNjtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG1lc3NhZ2UgPT09IHVuZGVmaW5lZCB8fCBtZXNzYWdlID09PSBudWxsKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXJndW1lbnQgJyArIG1lc3NhZ2UpO1xyXG5cclxuICAgIHZhciBkaWdlc3RieXRlcyA9IGNyeXB0LndvcmRzVG9CeXRlcyhtZDUobWVzc2FnZSwgb3B0aW9ucykpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5hc0J5dGVzID8gZGlnZXN0Ynl0ZXMgOlxyXG4gICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IGJpbi5ieXRlc1RvU3RyaW5nKGRpZ2VzdGJ5dGVzKSA6XHJcbiAgICAgICAgY3J5cHQuYnl0ZXNUb0hleChkaWdlc3RieXRlcyk7XHJcbiAgfTtcclxuXHJcbn0pKCk7XHJcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuMlxuKGZ1bmN0aW9uKCkge1xuICB2YXIgZ2V0TmFub1NlY29uZHMsIGhydGltZSwgbG9hZFRpbWUsIG1vZHVsZUxvYWRUaW1lLCBub2RlTG9hZFRpbWUsIHVwVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBub2RlTG9hZFRpbWUpIC8gMWU2O1xuICAgIH07XG4gICAgaHJ0aW1lID0gcHJvY2Vzcy5ocnRpbWU7XG4gICAgZ2V0TmFub1NlY29uZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBocjtcbiAgICAgIGhyID0gaHJ0aW1lKCk7XG4gICAgICByZXR1cm4gaHJbMF0gKiAxZTkgKyBoclsxXTtcbiAgICB9O1xuICAgIG1vZHVsZUxvYWRUaW1lID0gZ2V0TmFub1NlY29uZHMoKTtcbiAgICB1cFRpbWUgPSBwcm9jZXNzLnVwdGltZSgpICogMWU5O1xuICAgIG5vZGVMb2FkVGltZSA9IG1vZHVsZUxvYWRUaW1lIC0gdXBUaW1lO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJmb3JtYW5jZS1ub3cuanMubWFwXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHRzd2l0Y2ggKG9wdHMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnWycsXG5cdFx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdFx0J10nXG5cdFx0XHRcdF0uam9pbignJykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1snLFxuXHRcdFx0XHRcdGVuY29kZShpbmRleCwgb3B0cyksXG5cdFx0XHRcdFx0J109Jyxcblx0XHRcdFx0XHRlbmNvZGUodmFsdWUsIG9wdHMpXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1tdPScsXG5cdFx0XHRcdFx0ZW5jb2RlKHZhbHVlLCBvcHRzKVxuXHRcdFx0XHRdLmpvaW4oJycpO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0Jz0nLFxuXHRcdFx0XHRcdGVuY29kZSh2YWx1ZSwgb3B0cylcblx0XHRcdFx0XS5qb2luKCcnKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHR2YXIgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0cy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpIHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdHMpIHtcblx0aWYgKG9wdHMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdHMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xuXHRcdH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRba2V5XTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZXhwb3J0cy5leHRyYWN0ID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gc3RyLnNwbGl0KCc/JylbMV0gfHwgJyc7XG59O1xuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuXHRvcHRzID0gb2JqZWN0QXNzaWduKHthcnJheUZvcm1hdDogJ25vbmUnfSwgb3B0cyk7XG5cblx0dmFyIGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvaXNzdWVzLzQ3XG5cdHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL14oXFw/fCN8JikvLCAnJyk7XG5cblx0aWYgKCFzdHIpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0c3RyLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcblx0XHR2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuXHRcdC8vIEZpcmVmb3ggKHByZSA0MCkgZGVjb2RlcyBgJTNEYCB0byBgPWBcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZy9wdWxsLzM3XG5cdFx0dmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG5cdFx0dmFyIHZhbCA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiB1bmRlZmluZWQ7XG5cblx0XHQvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuXHRcdGZvcm1hdHRlcihkZWNvZGVVUklDb21wb25lbnQoa2V5KSwgdmFsLCByZXQpO1xuXHR9KTtcblxuXHRyZXR1cm4gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGtleSkge1xuXHRcdHZhciB2YWwgPSByZXRba2V5XTtcblx0XHRpZiAoQm9vbGVhbih2YWwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0XHRcdC8vIFNvcnQgb2JqZWN0IGtleXMsIG5vdCB2YWx1ZXNcblx0XHRcdHJlc3VsdFtrZXldID0ga2V5c1NvcnRlcih2YWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHZhbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn07XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgb3B0cykge1xuXHR2YXIgZGVmYXVsdHMgPSB7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnXG5cdH07XG5cblx0b3B0cyA9IG9iamVjdEFzc2lnbihkZWZhdWx0cywgb3B0cyk7XG5cblx0dmFyIGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRzKTtcblxuXHRyZXR1cm4gb2JqID8gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgdmFsID0gb2JqW2tleV07XG5cblx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAodmFsID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXG5cdFx0XHR2YWwuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwyKSB7XG5cdFx0XHRcdGlmICh2YWwyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQucHVzaChmb3JtYXR0ZXIoa2V5LCB2YWwyLCByZXN1bHQubGVuZ3RoKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcmJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdHMpICsgJz0nICsgZW5jb2RlKHZhbCwgb3B0cyk7XG5cdH0pLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuXHRcdHJldHVybiB4Lmxlbmd0aCA+IDA7XG5cdH0pLmpvaW4oJyYnKSA6ICcnO1xufTtcbiIsInZhciBub3cgPSByZXF1aXJlKCdwZXJmb3JtYW5jZS1ub3cnKVxuICAsIHJvb3QgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSByb290WydyZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBjYWYgPSByb290WydjYW5jZWwnICsgc3VmZml4XSB8fCByb290WydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cblxuZm9yKHZhciBpID0gMDsgIXJhZiAmJiBpIDwgdmVuZG9ycy5sZW5ndGg7IGkrKykge1xuICByYWYgPSByb290W3ZlbmRvcnNbaV0gKyAnUmVxdWVzdCcgKyBzdWZmaXhdXG4gIGNhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdDYW5jZWwnICsgc3VmZml4XVxuICAgICAgfHwgcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgdmFyIGxhc3QgPSAwXG4gICAgLCBpZCA9IDBcbiAgICAsIHF1ZXVlID0gW11cbiAgICAsIGZyYW1lRHVyYXRpb24gPSAxMDAwIC8gNjBcblxuICByYWYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIF9ub3cgPSBub3coKVxuICAgICAgICAsIG5leHQgPSBNYXRoLm1heCgwLCBmcmFtZUR1cmF0aW9uIC0gKF9ub3cgLSBsYXN0KSlcbiAgICAgIGxhc3QgPSBuZXh0ICsgX25vd1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNwID0gcXVldWUuc2xpY2UoMClcbiAgICAgICAgLy8gQ2xlYXIgcXVldWUgaGVyZSB0byBwcmV2ZW50XG4gICAgICAgIC8vIGNhbGxiYWNrcyBmcm9tIGFwcGVuZGluZyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgZnJhbWUncyBxdWV1ZVxuICAgICAgICBxdWV1ZS5sZW5ndGggPSAwXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKCFjcFtpXS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgY3BbaV0uY2FsbGJhY2sobGFzdClcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBNYXRoLnJvdW5kKG5leHQpKVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGhhbmRsZTogKytpZCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgY2FmID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihxdWV1ZVtpXS5oYW5kbGUgPT09IGhhbmRsZSkge1xuICAgICAgICBxdWV1ZVtpXS5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pIHtcbiAgLy8gV3JhcCBpbiBhIG5ldyBmdW5jdGlvbiB0byBwcmV2ZW50XG4gIC8vIGBjYW5jZWxgIHBvdGVudGlhbGx5IGJlaW5nIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBuYXRpdmUgckFGIGZ1bmN0aW9uXG4gIHJldHVybiByYWYuY2FsbChyb290LCBmbilcbn1cbm1vZHVsZS5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICBjYWYuYXBwbHkocm9vdCwgYXJndW1lbnRzKVxufVxubW9kdWxlLmV4cG9ydHMucG9seWZpbGwgPSBmdW5jdGlvbigpIHtcbiAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByYWZcbiAgcm9vdC5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhZlxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHNoYWxsb3dDb21wYXJlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnZmJqcy9saWIvc2hhbGxvd0VxdWFsJyk7XG5cbi8qKlxuICogRG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBmb3IgcHJvcHMgYW5kIHN0YXRlLlxuICogU2VlIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpblxuICogU2VlIGFsc28gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9zaGFsbG93LWNvbXBhcmUuaHRtbFxuICovXG5mdW5jdGlvbiBzaGFsbG93Q29tcGFyZShpbnN0YW5jZSwgbmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgcmV0dXJuIChcbiAgICAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnByb3BzLCBuZXh0UHJvcHMpIHx8XG4gICAgIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5zdGF0ZSwgbmV4dFN0YXRlKVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dDb21wYXJlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfbWQgPSByZXF1aXJlKCdtZDUnKTtcblxudmFyIF9tZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZCk7XG5cbnZhciBfcXVlcnlTdHJpbmcgPSByZXF1aXJlKCdxdWVyeS1zdHJpbmcnKTtcblxudmFyIF9xdWVyeVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9xdWVyeVN0cmluZyk7XG5cbnZhciBfaXNSZXRpbmEgPSByZXF1aXJlKCdpcy1yZXRpbmEnKTtcblxudmFyIF9pc1JldGluYTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1JldGluYSk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgX3Byb3BUeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wVHlwZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEdyYXZhdGFyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEdyYXZhdGFyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHcmF2YXRhcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JhdmF0YXIpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChHcmF2YXRhci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdyYXZhdGFyKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoR3JhdmF0YXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGJhc2UgPSB0aGlzLnByb3BzLnByb3RvY29sICsgJ3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyc7XG5cbiAgICAgIHZhciBxdWVyeSA9IF9xdWVyeVN0cmluZzIuZGVmYXVsdC5zdHJpbmdpZnkoe1xuICAgICAgICBzOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIHI6IHRoaXMucHJvcHMucmF0aW5nLFxuICAgICAgICBkOiB0aGlzLnByb3BzLmRlZmF1bHRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgcmV0aW5hUXVlcnkgPSBfcXVlcnlTdHJpbmcyLmRlZmF1bHQuc3RyaW5naWZ5KHtcbiAgICAgICAgczogdGhpcy5wcm9wcy5zaXplICogMixcbiAgICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICAgIGQ6IHRoaXMucHJvcHMuZGVmYXVsdFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdyYXZhdGFyIHNlcnZpY2UgY3VycmVudGx5IHRyaW1zIGFuZCBsb3dlcmNhc2VzIGFsbCByZWdpc3RlcmVkIGVtYWlsc1xuICAgICAgdmFyIGZvcm1hdHRlZEVtYWlsID0gKCcnICsgdGhpcy5wcm9wcy5lbWFpbCkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIHZhciBoYXNoID0gdm9pZCAwO1xuICAgICAgaWYgKHRoaXMucHJvcHMubWQ1KSB7XG4gICAgICAgIGhhc2ggPSB0aGlzLnByb3BzLm1kNTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcHMuZW1haWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGhhc2ggPSAoMCwgX21kMi5kZWZhdWx0KShmb3JtYXR0ZWRFbWFpbCwgeyBlbmNvZGluZzogXCJiaW5hcnlcIiB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignR3JhdmF0YXIgaW1hZ2UgY2FuIG5vdCBiZSBmZXRjaGVkLiBFaXRoZXIgdGhlIFwiZW1haWxcIiBvciBcIm1kNVwiIHByb3AgbXVzdCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JywgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzcmMgPSAnJyArIGJhc2UgKyBoYXNoICsgJz8nICsgcXVlcnk7XG4gICAgICB2YXIgcmV0aW5hU3JjID0gJycgKyBiYXNlICsgaGFzaCArICc/JyArIHJldGluYVF1ZXJ5O1xuXG4gICAgICB2YXIgbW9kZXJuQnJvd3NlciA9IHRydWU7IC8vIHNlcnZlci1zaWRlLCB3ZSByZW5kZXIgZm9yIG1vZGVybiBicm93c2Vyc1xuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgTm9kZUpTXG4gICAgICAgIG1vZGVybkJyb3dzZXIgPSAnc3Jjc2V0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNsYXNzTmFtZSA9ICdyZWFjdC1ncmF2YXRhcic7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgJyAnICsgdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENsb25lIHRoaXMucHJvcHMgYW5kIHRoZW4gZGVsZXRlIENvbXBvbmVudCBzcGVjaWZpYyBwcm9wcyBzbyB3ZSBjYW5cbiAgICAgIC8vIHNwcmVhZCB0aGUgcmVzdCBpbnRvIHRoZSBpbWcuXG5cbiAgICAgIHZhciByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHRoaXMucHJvcHMsIFtdKTtcblxuICAgICAgZGVsZXRlIHJlc3QubWQ1O1xuICAgICAgZGVsZXRlIHJlc3QuZW1haWw7XG4gICAgICBkZWxldGUgcmVzdC5wcm90b2NvbDtcbiAgICAgIGRlbGV0ZSByZXN0LnJhdGluZztcbiAgICAgIGRlbGV0ZSByZXN0LnNpemU7XG4gICAgICBkZWxldGUgcmVzdC5zdHlsZTtcbiAgICAgIGRlbGV0ZSByZXN0LmNsYXNzTmFtZTtcbiAgICAgIGRlbGV0ZSByZXN0LmRlZmF1bHQ7XG4gICAgICBpZiAoIW1vZGVybkJyb3dzZXIgJiYgKDAsIF9pc1JldGluYTIuZGVmYXVsdCkoKSkge1xuICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIF9leHRlbmRzKHtcbiAgICAgICAgICBhbHQ6ICdHcmF2YXRhciBmb3IgJyArIGZvcm1hdHRlZEVtYWlsLFxuICAgICAgICAgIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgIHNyYzogcmV0aW5hU3JjLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgfSwgcmVzdCwge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgX2V4dGVuZHMoe1xuICAgICAgICBhbHQ6ICdHcmF2YXRhciBmb3IgJyArIGZvcm1hdHRlZEVtYWlsLFxuICAgICAgICBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgIHNyY1NldDogcmV0aW5hU3JjICsgJyAyeCcsXG4gICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplXG4gICAgICB9LCByZXN0LCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdyYXZhdGFyO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuR3JhdmF0YXIuZGlzcGxheU5hbWUgPSAnR3JhdmF0YXInO1xuR3JhdmF0YXIucHJvcFR5cGVzID0ge1xuICBlbWFpbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIG1kNTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIHNpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLFxuICByYXRpbmc6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBkZWZhdWx0OiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgcHJvdG9jb2w6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3Rcbn07XG5HcmF2YXRhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNpemU6IDUwLFxuICByYXRpbmc6ICdnJyxcbiAgZGVmYXVsdDogJ3JldHJvJyxcbiAgcHJvdG9jb2w6ICcvLydcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHcmF2YXRhcjsiLCJtb2R1bGUuZXhwb3J0cyA9XG4vKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuXHQgIHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXHRcblx0dmFyIF9IaWdobGlnaHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdFxuXHR2YXIgX0hpZ2hsaWdodGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0hpZ2hsaWdodGVyKTtcblx0XG5cdHZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHRcblx0ZXhwb3J0c1snZGVmYXVsdCddID0gX0hpZ2hsaWdodGVyMlsnZGVmYXVsdCddO1xuXHRleHBvcnRzLmNvbWJpbmVDaHVua3MgPSBfdXRpbHMuY29tYmluZUNodW5rcztcblx0ZXhwb3J0cy5maWxsSW5DaHVua3MgPSBfdXRpbHMuZmlsbEluQ2h1bmtzO1xuXHRleHBvcnRzLmZpbmRBbGwgPSBfdXRpbHMuZmluZEFsbDtcblx0ZXhwb3J0cy5maW5kQ2h1bmtzID0gX3V0aWxzLmZpbmRDaHVua3M7XG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdCAgdmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IEhpZ2hsaWdodGVyO1xuXHRcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09ialsnZGVmYXVsdCddID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblx0XG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblx0XG5cdHZhciBfcmVhY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXHRcblx0dmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cdFxuXHR2YXIgX3V0aWxzSnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHRcblx0dmFyIENodW5rcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlsc0pzKTtcblx0XG5cdEhpZ2hsaWdodGVyLnByb3BUeXBlcyA9IHtcblx0ICBoaWdobGlnaHRDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHQgIGhpZ2hsaWdodFN0eWxlOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0ICBzZWFyY2hXb3JkczogX3JlYWN0LlByb3BUeXBlcy5hcnJheU9mKF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuXHQgIHRleHRUb0hpZ2hsaWdodDogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0ICBzYW5pdGl6ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH07XG5cdFxuXHQvKipcblx0ICogSGlnaGxpZ2h0cyBhbGwgb2NjdXJyZW5jZXMgb2Ygc2VhcmNoIHRlcm1zIChzZWFyY2hUZXh0KSB3aXRoaW4gYSBzdHJpbmcgKHRleHRUb0hpZ2hsaWdodCkuXG5cdCAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCA8c3Bhbj5zICh3cmFwcGluZyBoaWdobGlnaHRlZCB3b3JkcykuXG5cdCAqL1xuXHRcblx0ZnVuY3Rpb24gSGlnaGxpZ2h0ZXIoX3JlZikge1xuXHQgIHZhciBfcmVmJGhpZ2hsaWdodENsYXNzTmFtZSA9IF9yZWYuaGlnaGxpZ2h0Q2xhc3NOYW1lO1xuXHQgIHZhciBoaWdobGlnaHRDbGFzc05hbWUgPSBfcmVmJGhpZ2hsaWdodENsYXNzTmFtZSA9PT0gdW5kZWZpbmVkID8gJycgOiBfcmVmJGhpZ2hsaWdodENsYXNzTmFtZTtcblx0ICB2YXIgX3JlZiRoaWdobGlnaHRTdHlsZSA9IF9yZWYuaGlnaGxpZ2h0U3R5bGU7XG5cdCAgdmFyIGhpZ2hsaWdodFN0eWxlID0gX3JlZiRoaWdobGlnaHRTdHlsZSA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJGhpZ2hsaWdodFN0eWxlO1xuXHQgIHZhciBzZWFyY2hXb3JkcyA9IF9yZWYuc2VhcmNoV29yZHM7XG5cdCAgdmFyIHRleHRUb0hpZ2hsaWdodCA9IF9yZWYudGV4dFRvSGlnaGxpZ2h0O1xuXHQgIHZhciBzYW5pdGl6ZSA9IF9yZWYuc2FuaXRpemU7XG5cdFxuXHQgIHZhciBjaHVua3MgPSBDaHVua3MuZmluZEFsbCh0ZXh0VG9IaWdobGlnaHQsIHNlYXJjaFdvcmRzLCBzYW5pdGl6ZSk7XG5cdFxuXHQgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcblx0ICAgICdzcGFuJyxcblx0ICAgIG51bGwsXG5cdCAgICBjaHVua3MubWFwKGZ1bmN0aW9uIChjaHVuaywgaW5kZXgpIHtcblx0ICAgICAgdmFyIHRleHQgPSB0ZXh0VG9IaWdobGlnaHQuc3Vic3RyKGNodW5rLnN0YXJ0LCBjaHVuay5lbmQgLSBjaHVuay5zdGFydCk7XG5cdFxuXHQgICAgICBpZiAoY2h1bmsuaGlnaGxpZ2h0KSB7XG5cdCAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuXHQgICAgICAgICAgJ21hcmsnLFxuXHQgICAgICAgICAge1xuXHQgICAgICAgICAgICBjbGFzc05hbWU6IGhpZ2hsaWdodENsYXNzTmFtZSxcblx0ICAgICAgICAgICAga2V5OiBpbmRleCxcblx0ICAgICAgICAgICAgc3R5bGU6IGhpZ2hsaWdodFN0eWxlXG5cdCAgICAgICAgICB9LFxuXHQgICAgICAgICAgdGV4dFxuXHQgICAgICAgICk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuXHQgICAgICAgICAgJ3NwYW4nLFxuXHQgICAgICAgICAgeyBrZXk6IGluZGV4IH0sXG5cdCAgICAgICAgICB0ZXh0XG5cdCAgICAgICAgKTtcblx0ICAgICAgfVxuXHQgICAgfSlcblx0ICApO1xuXHR9XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgY2h1bmsgb2JqZWN0cyByZXByZXNlbnRpbmcgYm90aCBoaWdsaWdodGFibGUgYW5kIG5vbiBoaWdobGlnaHRhYmxlIHBpZWNlcyBvZiB0ZXh0IHRoYXQgbWF0Y2ggZWFjaCBzZWFyY2ggd29yZC5cblx0ICogQHBhcmFtIHNlYXJjaFdvcmRzIHN0cmluZ1tdXG5cdCAqIEBwYXJhbSB0ZXh0VG9TZWFyY2ggc3RyaW5nXG5cdCAqIEByZXR1cm4ge3N0YXJ0Om51bWJlciwgZW5kOm51bWJlciwgaGlnaGxpZ2h0OmJvb2xlYW59W11cblx0ICovXG5cdCd1c2Ugc3RyaWN0Jztcblx0XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0dmFyIGZpbmRBbGwgPSBmdW5jdGlvbiBmaW5kQWxsKHRleHRUb1NlYXJjaCwgd29yZHNUb0ZpbmQsIHNhbml0aXplKSB7XG5cdCAgcmV0dXJuIGZpbGxJbkNodW5rcyhjb21iaW5lQ2h1bmtzKGZpbmRDaHVua3ModGV4dFRvU2VhcmNoLCB3b3Jkc1RvRmluZCwgc2FuaXRpemUpKSwgdGV4dFRvU2VhcmNoLmxlbmd0aCk7XG5cdH07XG5cdFxuXHRleHBvcnRzLmZpbmRBbGwgPSBmaW5kQWxsO1xuXHQvKipcblx0ICogVGFrZXMgYW4gYXJyYXkgb2Yge3N0YXJ0Om51bWJlciwgZW5kOm51bWJlcn0gb2JqZWN0cyBhbmQgY29tYmluZXMgY2h1bmtzIHRoYXQgb3ZlcmxhcCBpbnRvIHNpbmdsZSBjaHVua3MuXG5cdCAqIEBwYXJhbSBjaHVua3Mge3N0YXJ0Om51bWJlciwgZW5kOm51bWJlcn1bXVxuXHQgKiBAcmV0dXJuIHtzdGFydDpudW1iZXIsIGVuZDpudW1iZXJ9W11cblx0ICovXG5cdHZhciBjb21iaW5lQ2h1bmtzID0gZnVuY3Rpb24gY29tYmluZUNodW5rcyhjaHVua3MpIHtcblx0ICBjaHVua3MgPSBjaHVua3Muc29ydChmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuXHQgICAgcmV0dXJuIGZpcnN0LnN0YXJ0IC0gc2Vjb25kLnN0YXJ0O1xuXHQgIH0pLnJlZHVjZShmdW5jdGlvbiAocHJvY2Vzc2VkQ2h1bmtzLCBuZXh0Q2h1bmspIHtcblx0ICAgIC8vIEZpcnN0IGNodW5rIGp1c3QgZ29lcyBzdHJhaWdodCBpbiB0aGUgYXJyYXkuLi5cblx0ICAgIGlmIChwcm9jZXNzZWRDaHVua3MubGVuZ3RoID09PSAwKSB7XG5cdCAgICAgIHJldHVybiBbbmV4dENodW5rXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIC4uLiBzdWJzZXF1ZW50IGNodW5rcyBnZXQgY2hlY2tlZCB0byBzZWUgaWYgdGhleSBvdmVybGFwLi4uXG5cdCAgICAgIHZhciBwcmV2Q2h1bmsgPSBwcm9jZXNzZWRDaHVua3MucG9wKCk7XG5cdCAgICAgIGlmIChuZXh0Q2h1bmsuc3RhcnQgPD0gcHJldkNodW5rLmVuZCkge1xuXHQgICAgICAgIC8vIEl0IG1heSBiZSB0aGUgY2FzZSB0aGF0IHByZXZDaHVuayBjb21wbGV0ZWx5IHN1cnJvdW5kcyBuZXh0Q2h1bmssIHNvIHRha2UgdGhlXG5cdCAgICAgICAgLy8gbGFyZ2VzdCBvZiB0aGUgZW5kIGluZGVjZXMuXG5cdCAgICAgICAgdmFyIGVuZEluZGV4ID0gTWF0aC5tYXgocHJldkNodW5rLmVuZCwgbmV4dENodW5rLmVuZCk7XG5cdCAgICAgICAgcHJvY2Vzc2VkQ2h1bmtzLnB1c2goeyBzdGFydDogcHJldkNodW5rLnN0YXJ0LCBlbmQ6IGVuZEluZGV4IH0pO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHByb2Nlc3NlZENodW5rcy5wdXNoKHByZXZDaHVuaywgbmV4dENodW5rKTtcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gcHJvY2Vzc2VkQ2h1bmtzO1xuXHQgICAgfVxuXHQgIH0sIFtdKTtcblx0XG5cdCAgcmV0dXJuIGNodW5rcztcblx0fTtcblx0XG5cdGV4cG9ydHMuY29tYmluZUNodW5rcyA9IGNvbWJpbmVDaHVua3M7XG5cdC8qKlxuXHQgKiBFeGFtaW5lIHRleHRUb1NlYXJjaCBmb3IgYW55IG1hdGNoZXMuXG5cdCAqIElmIHdlIGZpbmQgbWF0Y2hlcywgYWRkIHRoZW0gdG8gdGhlIHJldHVybmVkIGFycmF5IGFzIGEgXCJjaHVua1wiIG9iamVjdCAoe3N0YXJ0Om51bWJlciwgZW5kOm51bWJlcn0pLlxuXHQgKiBAcGFyYW0gdGV4dFRvU2VhcmNoIHN0cmluZ1xuXHQgKiBAcGFyYW0gd29yZHNUb0ZpbmQgc3RyaW5nW11cblx0ICogQHBhcmFtIHNhbml0aXplIFByb2Nlc3MgYW5kIG9wdGlvbmFsbHkgbW9kaWZ5IHRleHRUb1NlYXJjaCBhbmQgd29yZHNUb0ZpbmQgYmVmb3JlIGNvbXBhcmlzb247IHRoaXMgY2FuIGJlIHVzZWQgdG8gZWcuIHJlbW92ZSBhY2NlbnRzXG5cdCAqIEByZXR1cm4ge3N0YXJ0Om51bWJlciwgZW5kOm51bWJlcn1bXVxuXHQgKi9cblx0dmFyIGZpbmRDaHVua3MgPSBmdW5jdGlvbiBmaW5kQ2h1bmtzKHRleHRUb1NlYXJjaCwgd29yZHNUb0ZpbmQpIHtcblx0ICB2YXIgc2FuaXRpemUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBpZGVudGl0eSA6IGFyZ3VtZW50c1syXTtcblx0ICByZXR1cm4gd29yZHNUb0ZpbmQuZmlsdGVyKGZ1bmN0aW9uIChzZWFyY2hXb3JkKSB7XG5cdCAgICByZXR1cm4gc2VhcmNoV29yZDtcblx0ICB9KSAvLyBSZW1vdmUgZW1wdHkgd29yZHNcblx0ICAucmVkdWNlKGZ1bmN0aW9uIChjaHVua3MsIHNlYXJjaFdvcmQpIHtcblx0ICAgIHZhciBub3JtYWxpemVkV29yZCA9IHNhbml0aXplKHNlYXJjaFdvcmQpO1xuXHQgICAgdmFyIG5vcm1hbGl6ZWRUZXh0ID0gc2FuaXRpemUodGV4dFRvU2VhcmNoKTtcblx0ICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAobm9ybWFsaXplZFdvcmQsICdnaScpO1xuXHQgICAgdmFyIG1hdGNoID0gdW5kZWZpbmVkO1xuXHQgICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMobm9ybWFsaXplZFRleHQpKSAhPSBudWxsKSB7XG5cdCAgICAgIGNodW5rcy5wdXNoKHsgc3RhcnQ6IG1hdGNoLmluZGV4LCBlbmQ6IHJlZ2V4Lmxhc3RJbmRleCB9KTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBjaHVua3M7XG5cdCAgfSwgW10pO1xuXHR9O1xuXHRcblx0ZXhwb3J0cy5maW5kQ2h1bmtzID0gZmluZENodW5rcztcblx0LyoqXG5cdCAqIEdpdmVuIGEgc2V0IG9mIGNodW5rcyB0byBoaWdobGlnaHQsIGNyZWF0ZSBhbiBhZGRpdGlvbmFsIHNldCBvZiBjaHVua3Ncblx0ICogdG8gcmVwcmVzZW50IHRoZSBiaXRzIG9mIHRleHQgYmV0d2VlbiB0aGUgaGlnaGxpZ2h0ZWQgdGV4dC5cblx0ICogQHBhcmFtIGNodW5rc1RvSGlnaGxpZ2h0IHtzdGFydDpudW1iZXIsIGVuZDpudW1iZXJ9W11cblx0ICogQHBhcmFtIHRvdGFsTGVuZ3RoIG51bWJlclxuXHQgKiBAcmV0dXJuIHtzdGFydDpudW1iZXIsIGVuZDpudW1iZXIsIGhpZ2hsaWdodDpib29sZWFufVtdXG5cdCAqL1xuXHR2YXIgZmlsbEluQ2h1bmtzID0gZnVuY3Rpb24gZmlsbEluQ2h1bmtzKGNodW5rc1RvSGlnaGxpZ2h0LCB0b3RhbExlbmd0aCkge1xuXHQgIHZhciBhbGxDaHVua3MgPSBbXTtcblx0ICB2YXIgYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKHN0YXJ0LCBlbmQsIGhpZ2hsaWdodCkge1xuXHQgICAgaWYgKGVuZCAtIHN0YXJ0ID4gMCkge1xuXHQgICAgICBhbGxDaHVua3MucHVzaCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIGhpZ2hsaWdodDogaGlnaGxpZ2h0IH0pO1xuXHQgICAgfVxuXHQgIH07XG5cdFxuXHQgIGlmIChjaHVua3NUb0hpZ2hsaWdodC5sZW5ndGggPT09IDApIHtcblx0ICAgIGFwcGVuZCgwLCB0b3RhbExlbmd0aCwgZmFsc2UpO1xuXHQgIH0gZWxzZSB7XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICB2YXIgbGFzdEluZGV4ID0gMDtcblx0ICAgICAgY2h1bmtzVG9IaWdobGlnaHQuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmspIHtcblx0ICAgICAgICBhcHBlbmQobGFzdEluZGV4LCBjaHVuay5zdGFydCwgZmFsc2UpO1xuXHQgICAgICAgIGFwcGVuZChjaHVuay5zdGFydCwgY2h1bmsuZW5kLCB0cnVlKTtcblx0ICAgICAgICBsYXN0SW5kZXggPSBjaHVuay5lbmQ7XG5cdCAgICAgIH0pO1xuXHQgICAgICBhcHBlbmQobGFzdEluZGV4LCB0b3RhbExlbmd0aCwgZmFsc2UpO1xuXHQgICAgfSkoKTtcblx0ICB9XG5cdCAgcmV0dXJuIGFsbENodW5rcztcblx0fTtcblx0XG5cdGV4cG9ydHMuZmlsbEluQ2h1bmtzID0gZmlsbEluQ2h1bmtzO1xuXHRmdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuXHQgIHJldHVybiB2YWx1ZTtcblx0fVxuXG4vKioqLyB9XG4vKioqKioqLyBdKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcblxudmFyIF9yZWFjdFNlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdFNlbGVjdCk7XG5cbnZhciBfcmVhY3RWaXJ0dWFsaXplZCA9IHJlcXVpcmUoJ3JlYWN0LXZpcnR1YWxpemVkJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFZpcnR1YWxpemVkU2VsZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFZpcnR1YWxpemVkU2VsZWN0LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBWaXJ0dWFsaXplZFNlbGVjdChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaXJ0dWFsaXplZFNlbGVjdCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVmlydHVhbGl6ZWRTZWxlY3QpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9yZW5kZXJNZW51ID0gX3RoaXMuX3JlbmRlck1lbnUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29wdGlvblJlbmRlcmVyID0gX3RoaXMuX29wdGlvblJlbmRlcmVyLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKiBTZWUgVmlydHVhbFNjcm9sbCNyZWNvbXB1dGVSb3dIZWlnaHRzICovXG5cblxuICBfY3JlYXRlQ2xhc3MoVmlydHVhbGl6ZWRTZWxlY3QsIFt7XG4gICAga2V5OiAncmVjb21wdXRlT3B0aW9uSGVpZ2h0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZU9wdGlvbkhlaWdodHMoKSB7XG4gICAgICB2YXIgaW5kZXggPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAwIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICBpZiAodGhpcy5fdmlydHVhbFNjcm9sbCkge1xuICAgICAgICB0aGlzLl92aXJ0dWFsU2Nyb2xsLnJlY29tcHV0ZVJvd0hlaWdodHMoaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBTZWxlY3RDb21wb25lbnQgPSB0aGlzLl9nZXRTZWxlY3RDb21wb25lbnQoKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFNlbGVjdENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgbWVudVJlbmRlcmVyOiB0aGlzLl9yZW5kZXJNZW51LFxuICAgICAgICBtZW51U3R5bGU6IHsgb3ZlcmZsb3c6ICdoaWRkZW4nIH1cbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0plZFdhdHNvbi9yZWFjdC1zZWxlY3QvI2VmZmVjaWVudGx5LXJlbmRlcmluZy1sYXJnZS1saXN0cy13aXRoLXdpbmRvd2luZ1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfcmVuZGVyTWVudScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJNZW51KF9yZWYpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYuZm9jdXNlZE9wdGlvbjtcbiAgICAgIHZhciBmb2N1c09wdGlvbiA9IF9yZWYuZm9jdXNPcHRpb247XG4gICAgICB2YXIgbGFiZWxLZXkgPSBfcmVmLmxhYmVsS2V5O1xuICAgICAgdmFyIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gICAgICB2YXIgc2VsZWN0VmFsdWUgPSBfcmVmLnNlbGVjdFZhbHVlO1xuICAgICAgdmFyIHZhbHVlQXJyYXkgPSBfcmVmLnZhbHVlQXJyYXk7XG4gICAgICB2YXIgb3B0aW9uUmVuZGVyZXIgPSB0aGlzLnByb3BzLm9wdGlvblJlbmRlcmVyO1xuXG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbkluZGV4ID0gb3B0aW9ucy5pbmRleE9mKGZvY3VzZWRPcHRpb24pO1xuICAgICAgdmFyIGhlaWdodCA9IHRoaXMuX2NhbGN1bGF0ZVZpcnR1YWxTY3JvbGxIZWlnaHQoeyBvcHRpb25zOiBvcHRpb25zIH0pO1xuICAgICAgdmFyIGlubmVyUm93UmVuZGVyZXIgPSBvcHRpb25SZW5kZXJlciB8fCB0aGlzLl9vcHRpb25SZW5kZXJlcjtcblxuICAgICAgZnVuY3Rpb24gd3JhcHBlZFJvd1JlbmRlcmVyKF9yZWYyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IF9yZWYyLmluZGV4O1xuXG4gICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2luZGV4XTtcblxuICAgICAgICByZXR1cm4gaW5uZXJSb3dSZW5kZXJlcih7XG4gICAgICAgICAgZm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvbixcbiAgICAgICAgICBmb2N1c2VkT3B0aW9uSW5kZXg6IGZvY3VzZWRPcHRpb25JbmRleCxcbiAgICAgICAgICBmb2N1c09wdGlvbjogZm9jdXNPcHRpb24sXG4gICAgICAgICAgbGFiZWxLZXk6IGxhYmVsS2V5LFxuICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxuICAgICAgICAgIG9wdGlvbkluZGV4OiBpbmRleCxcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgIHNlbGVjdFZhbHVlOiBzZWxlY3RWYWx1ZSxcbiAgICAgICAgICB2YWx1ZUFycmF5OiB2YWx1ZUFycmF5XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIF9yZWFjdFZpcnR1YWxpemVkLkF1dG9TaXplcixcbiAgICAgICAgeyBkaXNhYmxlSGVpZ2h0OiB0cnVlIH0sXG4gICAgICAgIGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICAgIHZhciB3aWR0aCA9IF9yZWYzLndpZHRoO1xuICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RWaXJ0dWFsaXplZC5WaXJ0dWFsU2Nyb2xsLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdWaXJ0dWFsU2VsZWN0R3JpZCcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHJlZjogZnVuY3Rpb24gcmVmKF9yZWY1KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczIuX3ZpcnR1YWxTY3JvbGwgPSBfcmVmNTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByb3dDb3VudDogb3B0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICByb3dIZWlnaHQ6IGZ1bmN0aW9uIHJvd0hlaWdodChfcmVmNCkge1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSBfcmVmNC5pbmRleDtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5fZ2V0T3B0aW9uSGVpZ2h0KHtcbiAgICAgICAgICAgICAgICBvcHRpb246IG9wdGlvbnNbaW5kZXhdXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJvd1JlbmRlcmVyOiB3cmFwcGVkUm93UmVuZGVyZXIsXG4gICAgICAgICAgICBzY3JvbGxUb0luZGV4OiBmb2N1c2VkT3B0aW9uSW5kZXgsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2FsY3VsYXRlVmlydHVhbFNjcm9sbEhlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jYWxjdWxhdGVWaXJ0dWFsU2Nyb2xsSGVpZ2h0KF9yZWY2KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IF9yZWY2Lm9wdGlvbnM7XG4gICAgICB2YXIgbWF4SGVpZ2h0ID0gdGhpcy5wcm9wcy5tYXhIZWlnaHQ7XG5cblxuICAgICAgdmFyIGhlaWdodCA9IDA7XG5cbiAgICAgIGZvciAodmFyIG9wdGlvbkluZGV4ID0gMDsgb3B0aW9uSW5kZXggPCBvcHRpb25zLmxlbmd0aDsgb3B0aW9uSW5kZXgrKykge1xuICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tvcHRpb25JbmRleF07XG5cbiAgICAgICAgaGVpZ2h0ICs9IHRoaXMuX2dldE9wdGlvbkhlaWdodCh7IG9wdGlvbjogb3B0aW9uIH0pO1xuXG4gICAgICAgIGlmIChoZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgICByZXR1cm4gbWF4SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldE9wdGlvbkhlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRPcHRpb25IZWlnaHQoX3JlZjcpIHtcbiAgICAgIHZhciBvcHRpb24gPSBfcmVmNy5vcHRpb247XG4gICAgICB2YXIgb3B0aW9uSGVpZ2h0ID0gdGhpcy5wcm9wcy5vcHRpb25IZWlnaHQ7XG5cblxuICAgICAgcmV0dXJuIG9wdGlvbkhlaWdodCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gb3B0aW9uSGVpZ2h0KHsgb3B0aW9uOiBvcHRpb24gfSkgOiBvcHRpb25IZWlnaHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFNlbGVjdENvbXBvbmVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRTZWxlY3RDb21wb25lbnQoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBhc3luYyA9IF9wcm9wcy5hc3luYztcbiAgICAgIHZhciBzZWxlY3RDb21wb25lbnQgPSBfcHJvcHMuc2VsZWN0Q29tcG9uZW50O1xuXG5cbiAgICAgIGlmIChzZWxlY3RDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdENvbXBvbmVudDtcbiAgICAgIH0gZWxzZSBpZiAoYXN5bmMpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdFNlbGVjdDIuZGVmYXVsdC5Bc3luYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBfcmVhY3RTZWxlY3QyLmRlZmF1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29wdGlvblJlbmRlcmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29wdGlvblJlbmRlcmVyKF9yZWY4KSB7XG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWY4LmZvY3VzZWRPcHRpb247XG4gICAgICB2YXIgZm9jdXNPcHRpb24gPSBfcmVmOC5mb2N1c09wdGlvbjtcbiAgICAgIHZhciBsYWJlbEtleSA9IF9yZWY4LmxhYmVsS2V5O1xuICAgICAgdmFyIG9wdGlvbiA9IF9yZWY4Lm9wdGlvbjtcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IF9yZWY4LnNlbGVjdFZhbHVlO1xuXG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5fZ2V0T3B0aW9uSGVpZ2h0KHsgb3B0aW9uOiBvcHRpb24gfSk7XG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSBbJ1ZpcnR1YWxpemVkU2VsZWN0T3B0aW9uJ107XG5cbiAgICAgIGlmIChvcHRpb24gPT09IGZvY3VzZWRPcHRpb24pIHtcbiAgICAgICAgY2xhc3NOYW1lLnB1c2goJ1ZpcnR1YWxpemVkU2VsZWN0Rm9jdXNlZE9wdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNsYXNzTmFtZS5wdXNoKCdWaXJ0dWFsaXplZFNlbGVjdERpc2FibGVkT3B0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBldmVudHMgPSBvcHRpb24uZGlzYWJsZWQgPyB7fSA6IHtcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZWN0VmFsdWUob3B0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Nb3VzZU92ZXI6IGZ1bmN0aW9uIG9uTW91c2VPdmVyKCkge1xuICAgICAgICAgIHJldHVybiBmb2N1c09wdGlvbihvcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUuam9pbignICcpLFxuICAgICAgICAgIHN0eWxlOiB7IGhlaWdodDogaGVpZ2h0IH1cbiAgICAgICAgfSwgZXZlbnRzKSxcbiAgICAgICAgb3B0aW9uW2xhYmVsS2V5XVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmlydHVhbGl6ZWRTZWxlY3Q7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5WaXJ0dWFsaXplZFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIGFzeW5jOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG1heEhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb3B0aW9uSGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG4gIG9wdGlvblJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHNlbGVjdENvbXBvbmVudDogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuVmlydHVhbGl6ZWRTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBhc3luYzogZmFsc2UsXG4gIG1heEhlaWdodDogMjAwLFxuICBvcHRpb25IZWlnaHQ6IDM1XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gVmlydHVhbGl6ZWRTZWxlY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1ZpcnR1YWxpemVkU2VsZWN0ID0gcmVxdWlyZSgnLi9WaXJ0dWFsaXplZFNlbGVjdCcpO1xuXG52YXIgX1ZpcnR1YWxpemVkU2VsZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1ZpcnR1YWxpemVkU2VsZWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1ZpcnR1YWxpemVkU2VsZWN0Mi5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRoaXMgSE9DIGRlY29yYXRlcyBhIHZpcnR1YWxpemVkIGNvbXBvbmVudCBhbmQgcmVzcG9uZHMgdG8gYXJyb3cta2V5IGV2ZW50cyBieSBzY3JvbGxpbmcgb25lIHJvdyBvciBjb2x1bW4gYXQgYSB0aW1lLlxuICovXG52YXIgQXJyb3dLZXlTdGVwcGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFycm93S2V5U3RlcHBlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXJyb3dLZXlTdGVwcGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFycm93S2V5U3RlcHBlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXJyb3dLZXlTdGVwcGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyb3dLZXlTdGVwcGVyKSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBzY3JvbGxUb0NvbHVtbjogMCxcbiAgICAgIHNjcm9sbFRvUm93OiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gMDtcbiAgICBfdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gMDtcbiAgICBfdGhpcy5fcm93U3RhcnRJbmRleCA9IDA7XG4gICAgX3RoaXMuX3Jvd1N0b3BJbmRleCA9IDA7XG5cbiAgICBfdGhpcy5fb25LZXlEb3duID0gX3RoaXMuX29uS2V5RG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQgPSBfdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFycm93S2V5U3RlcHBlciwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfc3RhdGUuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfc3RhdGUuc2Nyb2xsVG9Sb3c7XG5cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5fb25LZXlEb3duXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuKHtcbiAgICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQsXG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IHNjcm9sbFRvQ29sdW1uLFxuICAgICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb1Jvd1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25LZXlEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uS2V5RG93bihldmVudCkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbkNvdW50ID0gX3Byb3BzMi5jb2x1bW5Db3VudDtcbiAgICAgIHZhciByb3dDb3VudCA9IF9wcm9wczIucm93Q291bnQ7XG5cbiAgICAgIC8vIFRoZSBhYm92ZSBjYXNlcyBhbGwgcHJldmVudCBkZWZhdWx0IGV2ZW50IGV2ZW50IGJlaGF2aW9yLlxuICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRoZSBncmlkIGZyb20gc2Nyb2xsaW5nIGFmdGVyIHRoZSBzbmFwLXRvIHVwZGF0ZS5cblxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWluKHRoaXMuX3Jvd1N0b3BJbmRleCArIDEsIHJvd0NvdW50IC0gMSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IE1hdGgubWF4KHRoaXMuX2NvbHVtblN0YXJ0SW5kZXggLSAxLCAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IE1hdGgubWluKHRoaXMuX2NvbHVtblN0b3BJbmRleCArIDEsIGNvbHVtbkNvdW50IC0gMSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvUm93OiBNYXRoLm1heCh0aGlzLl9yb3dTdGFydEluZGV4IC0gMSwgMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TZWN0aW9uUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TZWN0aW9uUmVuZGVyZWQoX3JlZikge1xuICAgICAgdmFyIGNvbHVtblN0YXJ0SW5kZXggPSBfcmVmLmNvbHVtblN0YXJ0SW5kZXg7XG4gICAgICB2YXIgY29sdW1uU3RvcEluZGV4ID0gX3JlZi5jb2x1bW5TdG9wSW5kZXg7XG4gICAgICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWYucm93U3RhcnRJbmRleDtcbiAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmLnJvd1N0b3BJbmRleDtcblxuICAgICAgdGhpcy5fY29sdW1uU3RhcnRJbmRleCA9IGNvbHVtblN0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9jb2x1bW5TdG9wSW5kZXggPSBjb2x1bW5TdG9wSW5kZXg7XG4gICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gcm93U3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX3Jvd1N0b3BJbmRleCA9IHJvd1N0b3BJbmRleDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXJyb3dLZXlTdGVwcGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQXJyb3dLZXlTdGVwcGVyLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBjb2x1bW5Db3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcm93Q291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBBcnJvd0tleVN0ZXBwZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BcnJvd0tleVN0ZXBwZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQXJyb3dLZXlTdGVwcGVyMiA9IHJlcXVpcmUoJy4vQXJyb3dLZXlTdGVwcGVyJyk7XG5cbnZhciBfQXJyb3dLZXlTdGVwcGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Fycm93S2V5U3RlcHBlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQXJyb3dLZXlTdGVwcGVyMy5kZWZhdWx0O1xuZXhwb3J0cy5BcnJvd0tleVN0ZXBwZXIgPSBfQXJyb3dLZXlTdGVwcGVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIERlY29yYXRvciBjb21wb25lbnQgdGhhdCBhdXRvbWF0aWNhbGx5IGFkanVzdHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgYSBzaW5nbGUgY2hpbGQuXG4gKiBDaGlsZCBjb21wb25lbnQgc2hvdWxkIG5vdCBiZSBkZWNsYXJlZCBhcyBhIGNoaWxkIGJ1dCBzaG91bGQgcmF0aGVyIGJlIHNwZWNpZmllZCBieSBhIGBDaGlsZENvbXBvbmVudGAgcHJvcGVydHkuXG4gKiBBbGwgb3RoZXIgcHJvcGVydGllcyB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBjaGlsZCBjb21wb25lbnQuXG4gKi9cbnZhciBBdXRvU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQXV0b1NpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBdXRvU2l6ZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b1NpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBdXRvU2l6ZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBdXRvU2l6ZXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHdpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9vblJlc2l6ZSA9IF90aGlzLl9vblJlc2l6ZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3NldFJlZiA9IF90aGlzLl9zZXRSZWYuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEF1dG9TaXplciwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgLy8gRGVsYXkgYWNjZXNzIG9mIHBhcmVudE5vZGUgdW50aWwgbW91bnQuXG4gICAgICAvLyBUaGlzIGhhbmRsZXMgZWRnZS1jYXNlcyB3aGVyZSB0aGUgY29tcG9uZW50IGhhcyBhbHJlYWR5IGJlZW4gdW5tb3VudGVkIGJlZm9yZSBpdHMgcmVmIGhhcyBiZWVuIHNldCxcbiAgICAgIC8vIEFzIHdlbGwgYXMgbGlicmFyaWVzIGxpa2UgcmVhY3QtbGl0ZSB3aGljaCBoYXZlIGEgc2xpZ2h0bHkgZGlmZmVyZW50IGxpZmVjeWNsZS5cbiAgICAgIHRoaXMuX3BhcmVudE5vZGUgPSB0aGlzLl9hdXRvU2l6ZXIucGFyZW50Tm9kZTtcblxuICAgICAgLy8gRGVmZXIgcmVxdWlyaW5nIHJlc2l6ZSBoYW5kbGVyIGluIG9yZGVyIHRvIHN1cHBvcnQgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgLy8gU2VlIGlzc3VlICM0MVxuICAgICAgdGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZSA9IHJlcXVpcmUoJy4uL3ZlbmRvci9kZXRlY3RFbGVtZW50UmVzaXplJyk7XG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplLmFkZFJlc2l6ZUxpc3RlbmVyKHRoaXMuX3BhcmVudE5vZGUsIHRoaXMuX29uUmVzaXplKTtcblxuICAgICAgdGhpcy5fb25SZXNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUpIHtcbiAgICAgICAgdGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZS5yZW1vdmVSZXNpemVMaXN0ZW5lcih0aGlzLl9wYXJlbnROb2RlLCB0aGlzLl9vblJlc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgZGlzYWJsZUhlaWdodCA9IF9wcm9wcy5kaXNhYmxlSGVpZ2h0O1xuICAgICAgdmFyIGRpc2FibGVXaWR0aCA9IF9wcm9wcy5kaXNhYmxlV2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBoZWlnaHQgPSBfc3RhdGUuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3N0YXRlLndpZHRoO1xuXG4gICAgICAvLyBPdXRlciBkaXYgc2hvdWxkIG5vdCBmb3JjZSB3aWR0aC9oZWlnaHQgc2luY2UgdGhhdCBtYXkgcHJldmVudCBjb250YWluZXJzIGZyb20gc2hyaW5raW5nLlxuICAgICAgLy8gSW5uZXIgY29tcG9uZW50IHNob3VsZCBvdmVyZmxvdyBhbmQgdXNlIGNhbGN1bGF0ZWQgd2lkdGgvaGVpZ2h0LlxuICAgICAgLy8gU2VlIGlzc3VlICM2OCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgICAgdmFyIG91dGVyU3R5bGUgPSB7IG92ZXJmbG93OiAndmlzaWJsZScgfTtcblxuICAgICAgaWYgKCFkaXNhYmxlSGVpZ2h0KSB7XG4gICAgICAgIG91dGVyU3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkaXNhYmxlV2lkdGgpIHtcbiAgICAgICAgb3V0ZXJTdHlsZS53aWR0aCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IHRoaXMuX3NldFJlZixcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgc3R5bGU6IG91dGVyU3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW4oeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJlc2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJlc2l6ZSgpIHtcbiAgICAgIHZhciBvblJlc2l6ZSA9IHRoaXMucHJvcHMub25SZXNpemU7XG5cbiAgICAgIC8vIEdhdXJkIGFnYWluc3QgQXV0b1NpemVyIGNvbXBvbmVudCBiZWluZyByZW1vdmVkIGZyb20gdGhlIERPTSBpbW1lZGlhdGVseSBhZnRlciBiZWluZyBhZGRlZC5cbiAgICAgIC8vIFRoaXMgY2FuIHJlc3VsdCBpbiBpbnZhbGlkIHN0eWxlIHZhbHVlcyB3aGljaCBjYW4gcmVzdWx0IGluIE5hTiB2YWx1ZXMgaWYgd2UgZG9uJ3QgaGFuZGxlIHRoZW0uXG4gICAgICAvLyBTZWUgaXNzdWUgIzE1MCBmb3IgbW9yZSBjb250ZXh0LlxuXG4gICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5fcGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBoZWlnaHQgPSBib3VuZGluZ1JlY3QuaGVpZ2h0IHx8IDA7XG4gICAgICB2YXIgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGggfHwgMDtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9wYXJlbnROb2RlKTtcbiAgICAgIHZhciBwYWRkaW5nTGVmdCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0LCAxMCkgfHwgMDtcbiAgICAgIHZhciBwYWRkaW5nUmlnaHQgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nUmlnaHQsIDEwKSB8fCAwO1xuICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nVG9wLCAxMCkgfHwgMDtcbiAgICAgIHZhciBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0JvdHRvbSwgMTApIHx8IDA7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCAtIHBhZGRpbmdUb3AgLSBwYWRkaW5nQm90dG9tLFxuICAgICAgICB3aWR0aDogd2lkdGggLSBwYWRkaW5nTGVmdCAtIHBhZGRpbmdSaWdodFxuICAgICAgfSk7XG5cbiAgICAgIG9uUmVzaXplKHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIFByZXZlbnQgZGV0ZWN0RWxlbWVudFJlc2l6ZSBsaWJyYXJ5IGZyb20gYmVpbmcgdHJpZ2dlcmVkIGJ5IHRoaXMgc2Nyb2xsIGV2ZW50LlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFJlZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRSZWYoYXV0b1NpemVyKSB7XG4gICAgICB0aGlzLl9hdXRvU2l6ZXIgPSBhdXRvU2l6ZXI7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF1dG9TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9TaXplci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGNoaWxkcmVuLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGhlaWdodCwgd2lkdGggfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogRGlzYWJsZSBkeW5hbWljIDpoZWlnaHQgcHJvcGVydHkgKi9cbiAgZGlzYWJsZUhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBEaXNhYmxlIGR5bmFtaWMgOndpZHRoIHByb3BlcnR5ICovXG4gIGRpc2FibGVXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIG9uLXJlc2l6ZTogKHsgaGVpZ2h0LCB3aWR0aCB9KSAqL1xuICBvblJlc2l6ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5BdXRvU2l6ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9TaXplcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkF1dG9TaXplciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9BdXRvU2l6ZXIyID0gcmVxdWlyZSgnLi9BdXRvU2l6ZXInKTtcblxudmFyIF9BdXRvU2l6ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXV0b1NpemVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkF1dG9TaXplciA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgX2RlZmF1bHRDZWxsU2l6ZUNhY2hlID0gcmVxdWlyZSgnLi9kZWZhdWx0Q2VsbFNpemVDYWNoZScpO1xuXG52YXIgX2RlZmF1bHRDZWxsU2l6ZUNhY2hlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDZWxsU2l6ZUNhY2hlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIE1lYXN1cmVzIGEgR3JpZCBjZWxsJ3MgY29udGVudHMgYnkgcmVuZGVyaW5nIHRoZW0gaW4gYSB3YXkgdGhhdCBpcyBub3QgdmlzaWJsZSB0byB0aGUgdXNlci5cbiAqIEVpdGhlciBhIGZpeGVkIHdpZHRoIG9yIGhlaWdodCBtYXkgYmUgcHJvdmlkZWQgaWYgaXQgaXMgZGVzaXJhYmxlIHRvIG1lYXN1cmUgb25seSBpbiBvbmUgZGlyZWN0aW9uLlxuICovXG52YXIgQ2VsbE1lYXN1cmVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENlbGxNZWFzdXJlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ2VsbE1lYXN1cmVyKHByb3BzLCBzdGF0ZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDZWxsTWVhc3VyZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENlbGxNZWFzdXJlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENlbGxNZWFzdXJlcikpLmNhbGwodGhpcywgcHJvcHMsIHN0YXRlKSk7XG5cbiAgICBfdGhpcy5fY2VsbFNpemVDYWNoZSA9IHByb3BzLmNlbGxTaXplQ2FjaGUgfHwgbmV3IF9kZWZhdWx0Q2VsbFNpemVDYWNoZTIuZGVmYXVsdCgpO1xuXG4gICAgX3RoaXMuZ2V0Q29sdW1uV2lkdGggPSBfdGhpcy5nZXRDb2x1bW5XaWR0aC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5nZXRSb3dIZWlnaHQgPSBfdGhpcy5nZXRSb3dIZWlnaHQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMucmVzZXRNZWFzdXJlbWVudHMgPSBfdGhpcy5yZXNldE1lYXN1cmVtZW50cy5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5yZXNldE1lYXN1cmVtZW50Rm9yQ29sdW1uID0gX3RoaXMucmVzZXRNZWFzdXJlbWVudEZvckNvbHVtbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5yZXNldE1lYXN1cmVtZW50Rm9yUm93ID0gX3RoaXMucmVzZXRNZWFzdXJlbWVudEZvclJvdy5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ2VsbE1lYXN1cmVyLCBbe1xuICAgIGtleTogJ2dldENvbHVtbldpZHRoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29sdW1uV2lkdGgoX3JlZikge1xuICAgICAgdmFyIGluZGV4ID0gX3JlZi5pbmRleDtcblxuICAgICAgaWYgKHRoaXMuX2NlbGxTaXplQ2FjaGUuaGFzQ29sdW1uV2lkdGgoaW5kZXgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsU2l6ZUNhY2hlLmdldENvbHVtbldpZHRoKGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJvd0NvdW50ID0gdGhpcy5wcm9wcy5yb3dDb3VudDtcblxuXG4gICAgICB2YXIgbWF4V2lkdGggPSAwO1xuXG4gICAgICBmb3IgKHZhciByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93Q291bnQ7IHJvd0luZGV4KyspIHtcbiAgICAgICAgdmFyIF9tZWFzdXJlQ2VsbDIgPSB0aGlzLl9tZWFzdXJlQ2VsbCh7XG4gICAgICAgICAgY2xpZW50V2lkdGg6IHRydWUsXG4gICAgICAgICAgY29sdW1uSW5kZXg6IGluZGV4LFxuICAgICAgICAgIHJvd0luZGV4OiByb3dJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgd2lkdGggPSBfbWVhc3VyZUNlbGwyLndpZHRoO1xuXG5cbiAgICAgICAgbWF4V2lkdGggPSBNYXRoLm1heChtYXhXaWR0aCwgd2lkdGgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jZWxsU2l6ZUNhY2hlLnNldENvbHVtbldpZHRoKGluZGV4LCBtYXhXaWR0aCk7XG5cbiAgICAgIHJldHVybiBtYXhXaWR0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRSb3dIZWlnaHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSb3dIZWlnaHQoX3JlZjIpIHtcbiAgICAgIHZhciBpbmRleCA9IF9yZWYyLmluZGV4O1xuXG4gICAgICBpZiAodGhpcy5fY2VsbFNpemVDYWNoZS5oYXNSb3dIZWlnaHQoaW5kZXgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsU2l6ZUNhY2hlLmdldFJvd0hlaWdodChpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2x1bW5Db3VudCA9IHRoaXMucHJvcHMuY29sdW1uQ291bnQ7XG5cblxuICAgICAgdmFyIG1heEhlaWdodCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCBjb2x1bW5Db3VudDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICB2YXIgX21lYXN1cmVDZWxsMyA9IHRoaXMuX21lYXN1cmVDZWxsKHtcbiAgICAgICAgICBjbGllbnRIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICAgIHJvd0luZGV4OiBpbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gX21lYXN1cmVDZWxsMy5oZWlnaHQ7XG5cblxuICAgICAgICBtYXhIZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIGhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NlbGxTaXplQ2FjaGUuc2V0Um93SGVpZ2h0KGluZGV4LCBtYXhIZWlnaHQpO1xuXG4gICAgICByZXR1cm4gbWF4SGVpZ2h0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Jlc2V0TWVhc3VyZW1lbnRGb3JDb2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldE1lYXN1cmVtZW50Rm9yQ29sdW1uKGNvbHVtbkluZGV4KSB7XG4gICAgICB0aGlzLl9jZWxsU2l6ZUNhY2hlLmNsZWFyQ29sdW1uV2lkdGgoY29sdW1uSW5kZXgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Jlc2V0TWVhc3VyZW1lbnRGb3JSb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldE1lYXN1cmVtZW50Rm9yUm93KHJvd0luZGV4KSB7XG4gICAgICB0aGlzLl9jZWxsU2l6ZUNhY2hlLmNsZWFyUm93SGVpZ2h0KHJvd0luZGV4KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZXNldE1lYXN1cmVtZW50cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0TWVhc3VyZW1lbnRzKCkge1xuICAgICAgdGhpcy5fY2VsbFNpemVDYWNoZS5jbGVhckFsbENvbHVtbldpZHRocygpO1xuICAgICAgdGhpcy5fY2VsbFNpemVDYWNoZS5jbGVhckFsbFJvd0hlaWdodHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fcmVuZGVyQW5kTW91bnQoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIHZhciBjZWxsU2l6ZUNhY2hlID0gdGhpcy5wcm9wcy5jZWxsU2l6ZUNhY2hlO1xuXG5cbiAgICAgIGlmIChjZWxsU2l6ZUNhY2hlICE9PSBuZXh0UHJvcHMuY2VsbFNpemVDYWNoZSkge1xuICAgICAgICB0aGlzLl9jZWxsU2l6ZUNhY2hlID0gbmV4dFByb3BzLmNlbGxTaXplQ2FjaGU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VwZGF0ZURpdkRpbWVuc2lvbnMobmV4dFByb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5fdW5tb3VudENvbnRhaW5lcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgZ2V0Q29sdW1uV2lkdGg6IHRoaXMuZ2V0Q29sdW1uV2lkdGgsXG4gICAgICAgIGdldFJvd0hlaWdodDogdGhpcy5nZXRSb3dIZWlnaHQsXG4gICAgICAgIHJlc2V0TWVhc3VyZW1lbnRzOiB0aGlzLnJlc2V0TWVhc3VyZW1lbnRzLFxuICAgICAgICByZXNldE1lYXN1cmVtZW50Rm9yQ29sdW1uOiB0aGlzLnJlc2V0TWVhc3VyZW1lbnRGb3JDb2x1bW4sXG4gICAgICAgIHJlc2V0TWVhc3VyZW1lbnRGb3JSb3c6IHRoaXMucmVzZXRNZWFzdXJlbWVudEZvclJvd1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldENvbnRhaW5lck5vZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q29udGFpbmVyTm9kZShwcm9wcykge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IHByb3BzLmNvbnRhaW5lcjtcblxuXG4gICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUodHlwZW9mIGNvbnRhaW5lciA9PT0gJ2Z1bmN0aW9uJyA/IGNvbnRhaW5lcigpIDogY29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19tZWFzdXJlQ2VsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9tZWFzdXJlQ2VsbChfcmVmMykge1xuICAgICAgdmFyIF9yZWYzJGNsaWVudEhlaWdodCA9IF9yZWYzLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmMyRjbGllbnRIZWlnaHQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjMkY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIF9yZWYzJGNsaWVudFdpZHRoID0gX3JlZjMuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBfcmVmMyRjbGllbnRXaWR0aCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYzJGNsaWVudFdpZHRoO1xuICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjMuY29sdW1uSW5kZXg7XG4gICAgICB2YXIgcm93SW5kZXggPSBfcmVmMy5yb3dJbmRleDtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSB0aGlzLnByb3BzLmNlbGxSZW5kZXJlcjtcblxuXG4gICAgICB2YXIgcmVuZGVyZWQgPSBjZWxsUmVuZGVyZXIoe1xuICAgICAgICBjb2x1bW5JbmRleDogY29sdW1uSW5kZXgsXG4gICAgICAgIHJvd0luZGV4OiByb3dJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEhhbmRsZSBlZGdlIGNhc2Ugd2hlcmUgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGJlZm9yZSB0aGUgQ2VsbE1lYXN1cmVyIGhhcyBjb21wbGV0ZWQgaXRzIGluaXRpYWwgcmVuZGVyIChhbmQgbW91bnRlZCkuXG4gICAgICB0aGlzLl9yZW5kZXJBbmRNb3VudCgpO1xuXG4gICAgICAvLyBAVE9ETyBLZWVwIGFuIGV5ZSBvbiB0aGlzIGZvciBmdXR1cmUgUmVhY3QgdXBkYXRlcyBhcyB0aGUgaW50ZXJmYWNlIG1heSBjaGFuZ2U6XG4gICAgICAvLyBodHRwczovL3R3aXR0ZXIuY29tL3NvcHJhbm8vc3RhdHVzLzczNzMxNjM3OTcxMjMzMTc3NlxuICAgICAgX3JlYWN0RG9tMi5kZWZhdWx0LnVuc3RhYmxlX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyKHRoaXMsIHJlbmRlcmVkLCB0aGlzLl9kaXYpO1xuXG4gICAgICB2YXIgbWVhc3VyZW1lbnRzID0ge1xuICAgICAgICBoZWlnaHQ6IGNsaWVudEhlaWdodCAmJiB0aGlzLl9kaXYuY2xpZW50SGVpZ2h0LFxuICAgICAgICB3aWR0aDogY2xpZW50V2lkdGggJiYgdGhpcy5fZGl2LmNsaWVudFdpZHRoXG4gICAgICB9O1xuXG4gICAgICBfcmVhY3REb20yLmRlZmF1bHQudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLl9kaXYpO1xuXG4gICAgICByZXR1cm4gbWVhc3VyZW1lbnRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZW5kZXJBbmRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJBbmRNb3VudCgpIHtcbiAgICAgIGlmICghdGhpcy5fZGl2KSB7XG4gICAgICAgIHRoaXMuX2RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9kaXYuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICB0aGlzLl9kaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9kaXYuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLl9kaXYuc3R5bGUuekluZGV4ID0gLTE7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlRGl2RGltZW5zaW9ucyh0aGlzLnByb3BzKTtcblxuICAgICAgICB0aGlzLl9jb250YWluZXJOb2RlID0gdGhpcy5fZ2V0Q29udGFpbmVyTm9kZSh0aGlzLnByb3BzKTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyTm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9kaXYpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191bm1vdW50Q29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VubW91bnRDb250YWluZXIoKSB7XG4gICAgICBpZiAodGhpcy5fZGl2KSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lck5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fZGl2KTtcblxuICAgICAgICB0aGlzLl9kaXYgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jb250YWluZXJOb2RlID0gbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfdXBkYXRlRGl2RGltZW5zaW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVEaXZEaW1lbnNpb25zKHByb3BzKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gcHJvcHMud2lkdGg7XG5cblxuICAgICAgaWYgKGhlaWdodCAmJiBoZWlnaHQgIT09IHRoaXMuX2RpdkhlaWdodCkge1xuICAgICAgICB0aGlzLl9kaXZIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpdi5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgfVxuXG4gICAgICBpZiAod2lkdGggJiYgd2lkdGggIT09IHRoaXMuX2RpdldpZHRoKSB7XG4gICAgICAgIHRoaXMuX2RpdldpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2Rpdi5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ2VsbE1lYXN1cmVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ2VsbE1lYXN1cmVyLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIFJlbmRlcnMgYSBjZWxsIGdpdmVuIGl0cyBpbmRpY2VzLlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoeyBjb2x1bW5JbmRleDogbnVtYmVyLCByb3dJbmRleDogbnVtYmVyIH0pOiBQcm9wVHlwZXMubm9kZVxuICAgKi9cbiAgY2VsbFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwsIGN1c3RvbSBjYWNoaW5nIHN0cmF0ZWd5IGZvciBjZWxsIHNpemVzLlxuICAgKi9cbiAgY2VsbFNpemVDYWNoZTogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgYSB2aXJ0dWFsaXplZCBjb21wb25lbnQuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgZ2V0Q29sdW1uV2lkdGgsIGdldFJvd0hlaWdodCwgcmVzZXRNZWFzdXJlbWVudHMgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNvbHVtbnMgaW4gZ3JpZC5cbiAgICovXG4gIGNvbHVtbkNvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBBIE5vZGUsIENvbXBvbmVudCBpbnN0YW5jZSwgb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGVpdGhlci5cbiAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3BlY2lmaWVkIHRoZSBkb2N1bWVudCBib2R5IHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIGNvbnRhaW5lcjogX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXMuZnVuYywgX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcy5ub2RlXSksXG5cbiAgLyoqXG4gICAqIEFzc2lnbiBhIGZpeGVkIDpoZWlnaHQgaW4gb3JkZXIgdG8gbWVhc3VyZSBkeW5hbWljIHRleHQgOndpZHRoIG9ubHkuXG4gICAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBncmlkLlxuICAgKi9cbiAgcm93Q291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEFzc2lnbiBhIGZpeGVkIDp3aWR0aCBpbiBvcmRlciB0byBtZWFzdXJlIGR5bmFtaWMgdGV4dCA6aGVpZ2h0IG9ubHkuXG4gICAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXJcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDZWxsTWVhc3VyZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogRGVmYXVsdCBDZWxsTWVhc3VyZXIgYGNlbGxTaXplQ2FjaGVgIGltcGxlbWVudGF0aW9uLlxuICogUGVybWFuZW50bHkgY2FjaGVzIGFsbCBjZWxsIHNpemVzIChpZGVudGlmaWVkIGJ5IGNvbHVtbiBhbmQgcm93IGluZGV4KSB1bmxlc3MgZXhwbGljaXRseSBjbGVhcmVkLlxuICogQ2FuIGJlIGNvbmZpZ3VyZWQgdG8gaGFuZGxlIHVuaWZvcm0gY2VsbCB3aWR0aHMgYW5kL29yIGhlaWdodHMgYXMgYSB3YXkgb2Ygb3B0aW1pemluZyBjZXJ0YWluIHVzZSBjYXNlcy5cbiAqL1xudmFyIENlbGxTaXplQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENlbGxTaXplQ2FjaGUoKSB7XG4gICAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgIHZhciBfcmVmJHVuaWZvcm1Sb3dIZWlnaHQgPSBfcmVmLnVuaWZvcm1Sb3dIZWlnaHQ7XG4gICAgdmFyIHVuaWZvcm1Sb3dIZWlnaHQgPSBfcmVmJHVuaWZvcm1Sb3dIZWlnaHQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiR1bmlmb3JtUm93SGVpZ2h0O1xuICAgIHZhciBfcmVmJHVuaWZvcm1Db2x1bW5XaWQgPSBfcmVmLnVuaWZvcm1Db2x1bW5XaWR0aDtcbiAgICB2YXIgdW5pZm9ybUNvbHVtbldpZHRoID0gX3JlZiR1bmlmb3JtQ29sdW1uV2lkID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkdW5pZm9ybUNvbHVtbldpZDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDZWxsU2l6ZUNhY2hlKTtcblxuICAgIHRoaXMuX3VuaWZvcm1Sb3dIZWlnaHQgPSB1bmlmb3JtUm93SGVpZ2h0O1xuICAgIHRoaXMuX3VuaWZvcm1Db2x1bW5XaWR0aCA9IHVuaWZvcm1Db2x1bW5XaWR0aDtcblxuICAgIHRoaXMuX2NhY2hlZENvbHVtbldpZHRocyA9IHt9O1xuICAgIHRoaXMuX2NhY2hlZFJvd0hlaWdodHMgPSB7fTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDZWxsU2l6ZUNhY2hlLCBbe1xuICAgIGtleTogXCJjbGVhckFsbENvbHVtbldpZHRoc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhckFsbENvbHVtbldpZHRocygpIHtcbiAgICAgIHRoaXMuX2NhY2hlZENvbHVtbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fY2FjaGVkQ29sdW1uV2lkdGhzID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyQWxsUm93SGVpZ2h0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhckFsbFJvd0hlaWdodHMoKSB7XG4gICAgICB0aGlzLl9jYWNoZWRSb3dIZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jYWNoZWRSb3dIZWlnaHRzID0ge307XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyQ29sdW1uV2lkdGhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJDb2x1bW5XaWR0aChpbmRleCkge1xuICAgICAgdGhpcy5fY2FjaGVkQ29sdW1uV2lkdGggPSB1bmRlZmluZWQ7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZWRDb2x1bW5XaWR0aHNbaW5kZXhdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclJvd0hlaWdodFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhclJvd0hlaWdodChpbmRleCkge1xuICAgICAgdGhpcy5fY2FjaGVkUm93SGVpZ2h0ID0gdW5kZWZpbmVkO1xuXG4gICAgICBkZWxldGUgdGhpcy5fY2FjaGVkUm93SGVpZ2h0c1tpbmRleF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENvbHVtbldpZHRoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5fdW5pZm9ybUNvbHVtbldpZHRoID8gdGhpcy5fY2FjaGVkQ29sdW1uV2lkdGggOiB0aGlzLl9jYWNoZWRDb2x1bW5XaWR0aHNbaW5kZXhdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRSb3dIZWlnaHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Um93SGVpZ2h0KGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5fdW5pZm9ybVJvd0hlaWdodCA/IHRoaXMuX2NhY2hlZFJvd0hlaWdodCA6IHRoaXMuX2NhY2hlZFJvd0hlaWdodHNbaW5kZXhdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYXNDb2x1bW5XaWR0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNDb2x1bW5XaWR0aChpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3VuaWZvcm1Db2x1bW5XaWR0aCA/ICEhdGhpcy5fY2FjaGVkQ29sdW1uV2lkdGggOiAhIXRoaXMuX2NhY2hlZENvbHVtbldpZHRoc1tpbmRleF07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhc1Jvd0hlaWdodFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNSb3dIZWlnaHQoaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLl91bmlmb3JtUm93SGVpZ2h0ID8gISF0aGlzLl9jYWNoZWRSb3dIZWlnaHQgOiAhIXRoaXMuX2NhY2hlZFJvd0hlaWdodHNbaW5kZXhdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRDb2x1bW5XaWR0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRDb2x1bW5XaWR0aChpbmRleCwgd2lkdGgpIHtcbiAgICAgIHRoaXMuX2NhY2hlZENvbHVtbldpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLl9jYWNoZWRDb2x1bW5XaWR0aHNbaW5kZXhdID0gd2lkdGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFJvd0hlaWdodFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRSb3dIZWlnaHQoaW5kZXgsIGhlaWdodCkge1xuICAgICAgdGhpcy5fY2FjaGVkUm93SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgdGhpcy5fY2FjaGVkUm93SGVpZ2h0c1tpbmRleF0gPSBoZWlnaHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENlbGxTaXplQ2FjaGU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENlbGxTaXplQ2FjaGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0Q2VsbFNpemVDYWNoZSA9IGV4cG9ydHMuQ2VsbE1lYXN1cmVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0NlbGxNZWFzdXJlcjIgPSByZXF1aXJlKCcuL0NlbGxNZWFzdXJlcicpO1xuXG52YXIgX0NlbGxNZWFzdXJlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9DZWxsTWVhc3VyZXIyKTtcblxudmFyIF9kZWZhdWx0Q2VsbFNpemVDYWNoZTIgPSByZXF1aXJlKCcuL2RlZmF1bHRDZWxsU2l6ZUNhY2hlJyk7XG5cbnZhciBfZGVmYXVsdENlbGxTaXplQ2FjaGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdENlbGxTaXplQ2FjaGUyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NlbGxNZWFzdXJlcjMuZGVmYXVsdDtcbmV4cG9ydHMuQ2VsbE1lYXN1cmVyID0gX0NlbGxNZWFzdXJlcjMuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdENlbGxTaXplQ2FjaGUgPSBfZGVmYXVsdENlbGxTaXplQ2FjaGUzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfQ29sbGVjdGlvblZpZXcgPSByZXF1aXJlKCcuL0NvbGxlY3Rpb25WaWV3Jyk7XG5cbnZhciBfQ29sbGVjdGlvblZpZXcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sbGVjdGlvblZpZXcpO1xuXG52YXIgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEyID0gcmVxdWlyZSgnLi91dGlscy9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhJyk7XG5cbnZhciBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhMik7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4ID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4Jyk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBSZW5kZXJzIHNjYXR0ZXJlZCBvciBub24tbGluZWFyIGRhdGEuXG4gKiBVbmxpa2UgR3JpZCwgd2hpY2ggcmVuZGVycyBjaGVja2VyYm9hcmQgZGF0YSwgQ29sbGVjdGlvbiBjYW4gcmVuZGVyIGFyYml0cmFyaWx5IHBvc2l0aW9uZWQtIGV2ZW4gb3ZlcmxhcHBpbmctIGRhdGEuXG4gKi9cbnZhciBDb2xsZWN0aW9uID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbGxlY3Rpb24sIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxlY3Rpb24ocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sbGVjdGlvbik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ29sbGVjdGlvbi5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbGxlY3Rpb24pKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fY2VsbE1ldGFkYXRhID0gW107XG4gICAgX3RoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzID0gW107XG5cbiAgICAvLyBDZWxsIGNhY2hlIGR1cmluZyBzY3JvbGwgKGZvciBwZXJmb3JhbW5jZSlcbiAgICBfdGhpcy5fY2VsbENhY2hlID0gW107XG5cbiAgICBfdGhpcy5faXNTY3JvbGxpbmdDaGFuZ2UgPSBfdGhpcy5faXNTY3JvbGxpbmdDaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqIFNlZSBDb2xsZWN0aW9uI3JlY29tcHV0ZUNlbGxTaXplc0FuZFBvc2l0aW9ucyAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENvbGxlY3Rpb24sIFt7XG4gICAga2V5OiAncmVjb21wdXRlQ2VsbFNpemVzQW5kUG9zaXRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlQ2VsbFNpemVzQW5kUG9zaXRpb25zKCkge1xuICAgICAgdGhpcy5fY2VsbENhY2hlID0gW107XG4gICAgICB0aGlzLl9jb2xsZWN0aW9uVmlldy5yZWNvbXB1dGVDZWxsU2l6ZXNBbmRQb3NpdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKiogUmVhY3QgbGlmZWN5Y2xlIG1ldGhvZHMgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh0aGlzLnByb3BzLCBbXSk7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfQ29sbGVjdGlvblZpZXcyLmRlZmF1bHQsIF9leHRlbmRzKHtcbiAgICAgICAgY2VsbExheW91dE1hbmFnZXI6IHRoaXMsXG4gICAgICAgIGlzU2Nyb2xsaW5nQ2hhbmdlOiB0aGlzLl9pc1Njcm9sbGluZ0NoYW5nZSxcbiAgICAgICAgcmVmOiBmdW5jdGlvbiByZWYoX3JlZikge1xuICAgICAgICAgIF90aGlzMi5fY29sbGVjdGlvblZpZXcgPSBfcmVmO1xuICAgICAgICB9XG4gICAgICB9LCBwcm9wcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qKiBDZWxsTGF5b3V0TWFuYWdlciBpbnRlcmZhY2UgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsQ291bnQgPSBfcHJvcHMuY2VsbENvdW50O1xuICAgICAgdmFyIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIgPSBfcHJvcHMuY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjtcbiAgICAgIHZhciBzZWN0aW9uU2l6ZSA9IF9wcm9wcy5zZWN0aW9uU2l6ZTtcblxuXG4gICAgICB2YXIgZGF0YSA9ICgwLCBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YTMuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsQ291bnQ6IGNlbGxDb3VudCxcbiAgICAgICAgY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjogY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcixcbiAgICAgICAgc2VjdGlvblNpemU6IHNlY3Rpb25TaXplXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY2VsbE1ldGFkYXRhID0gZGF0YS5jZWxsTWV0YWRhdGE7XG4gICAgICB0aGlzLl9zZWN0aW9uTWFuYWdlciA9IGRhdGEuc2VjdGlvbk1hbmFnZXI7XG4gICAgICB0aGlzLl9oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgIHRoaXMuX3dpZHRoID0gZGF0YS53aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtb3N0IHJlY2VudGx5IHJlbmRlcmVkIHNldCBvZiBjZWxsIGluZGljZXMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldExhc3RSZW5kZXJlZEluZGljZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRMYXN0UmVuZGVyZWRJbmRpY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gYW1vdW50IG9mIGNoYW5nZSBmcm9tIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBjZWxsIGlzIChmdWxseSkgdmlzaWJsZS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2Nyb2xsUG9zaXRpb25Gb3JDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb25Gb3JDZWxsKF9yZWYyKSB7XG4gICAgICB2YXIgYWxpZ24gPSBfcmVmMi5hbGlnbjtcbiAgICAgIHZhciBjZWxsSW5kZXggPSBfcmVmMi5jZWxsSW5kZXg7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYyLnNjcm9sbFRvcDtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYyLndpZHRoO1xuICAgICAgdmFyIGNlbGxDb3VudCA9IHRoaXMucHJvcHMuY2VsbENvdW50O1xuXG5cbiAgICAgIGlmIChjZWxsSW5kZXggPj0gMCAmJiBjZWxsSW5kZXggPCBjZWxsQ291bnQpIHtcbiAgICAgICAgdmFyIGNlbGxNZXRhZGF0YSA9IHRoaXMuX2NlbGxNZXRhZGF0YVtjZWxsSW5kZXhdO1xuXG4gICAgICAgIHNjcm9sbExlZnQgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjZWxsTWV0YWRhdGEueCxcbiAgICAgICAgICBjZWxsU2l6ZTogY2VsbE1ldGFkYXRhLndpZHRoLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxUb3AgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjZWxsTWV0YWRhdGEueSxcbiAgICAgICAgICBjZWxsU2l6ZTogY2VsbE1ldGFkYXRhLmhlaWdodCxcbiAgICAgICAgICBjb250YWluZXJTaXplOiBoZWlnaHQsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFRvdGFsU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvdGFsU2l6ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogdGhpcy5faGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpcy5fd2lkdGhcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2VsbFJlbmRlcmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNlbGxSZW5kZXJlcnMoX3JlZjMpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZjMuaGVpZ2h0O1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3JlZjMuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmMy53aWR0aDtcbiAgICAgIHZhciB4ID0gX3JlZjMueDtcbiAgICAgIHZhciB5ID0gX3JlZjMueTtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsR3JvdXBSZW5kZXJlciA9IF9wcm9wczIuY2VsbEdyb3VwUmVuZGVyZXI7XG4gICAgICB2YXIgY2VsbFJlbmRlcmVyID0gX3Byb3BzMi5jZWxsUmVuZGVyZXI7XG5cbiAgICAgIC8vIFN0b3JlIGZvciBsYXRlciBjYWxscyB0byBnZXRMYXN0UmVuZGVyZWRJbmRpY2VzKClcblxuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkQ2VsbEluZGljZXMgPSB0aGlzLl9zZWN0aW9uTWFuYWdlci5nZXRDZWxsSW5kaWNlcyh7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2VsbEdyb3VwUmVuZGVyZXIoe1xuICAgICAgICBjZWxsQ2FjaGU6IHRoaXMuX2NlbGxDYWNoZSxcbiAgICAgICAgY2VsbFJlbmRlcmVyOiBjZWxsUmVuZGVyZXIsXG4gICAgICAgIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI6IGZ1bmN0aW9uIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIoX3JlZjQpIHtcbiAgICAgICAgICB2YXIgaW5kZXggPSBfcmVmNC5pbmRleDtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLl9zZWN0aW9uTWFuYWdlci5nZXRDZWxsTWV0YWRhdGEoeyBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHRoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzLFxuICAgICAgICBpc1Njcm9sbGluZzogaXNTY3JvbGxpbmdcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pc1Njcm9sbGluZ0NoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pc1Njcm9sbGluZ0NoYW5nZShpc1Njcm9sbGluZykge1xuICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuICAgICAgICB0aGlzLl9jZWxsQ2FjaGUgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sbGVjdGlvbjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbGxlY3Rpb24ucHJvcFR5cGVzID0ge1xuICAnYXJpYS1sYWJlbCc6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY2VsbHMgaW4gQ29sbGVjdGlvbi5cbiAgICovXG4gIGNlbGxDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGdyb3VwIG9mIGNlbGxzIGdpdmVuIHRoZWlyIGluZGljZXMuXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6ICh7XG4gICAqICAgY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjpGdW5jdGlvbixcbiAgICogICBpbmRpY2VzOiBBcnJheTxudW1iZXI+LFxuICAgKiAgIGNlbGxSZW5kZXJlcjogRnVuY3Rpb25cbiAgICogfSk6IEFycmF5PFByb3BUeXBlcy5ub2RlPlxuICAgKi9cbiAgY2VsbEdyb3VwUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBSZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY2VsbCBnaXZlbiBhbiByb3cgYW5kIGNvbHVtbiBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHsgaW5kZXg6IG51bWJlciB9KTogUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNlbGxSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgc2l6ZSBhbmQgb2Zmc2V0L3Bvc2l0aW9uIGluZm9ybWF0aW9uIGZvciBhIGdpdmVuIGNlbGwgKGluZGV4KS5cbiAgICogKHsgaW5kZXg6IG51bWJlciB9KTogeyBoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIgfVxuICAgKi9cbiAgY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgb3ZlcnJpZGUgdGhlIHNpemUgb2YgdGhlIHNlY3Rpb25zIGEgQ29sbGVjdGlvbidzIGNlbGxzIGFyZSBzcGxpdCBpbnRvLlxuICAgKi9cbiAgc2VjdGlvblNpemU6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG59O1xuQ29sbGVjdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gICdhcmlhLWxhYmVsJzogJ2dyaWQnLFxuICBjZWxsR3JvdXBSZW5kZXJlcjogZGVmYXVsdENlbGxHcm91cFJlbmRlcmVyXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGVjdGlvbjtcblxuXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbEdyb3VwUmVuZGVyZXIoX3JlZjUpIHtcbiAgdmFyIGNlbGxDYWNoZSA9IF9yZWY1LmNlbGxDYWNoZTtcbiAgdmFyIGNlbGxSZW5kZXJlciA9IF9yZWY1LmNlbGxSZW5kZXJlcjtcbiAgdmFyIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIgPSBfcmVmNS5jZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyO1xuICB2YXIgaW5kaWNlcyA9IF9yZWY1LmluZGljZXM7XG4gIHZhciBpc1Njcm9sbGluZyA9IF9yZWY1LmlzU2Nyb2xsaW5nO1xuXG4gIHJldHVybiBpbmRpY2VzLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB2YXIgY2VsbE1ldGFkYXRhID0gY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcih7IGluZGV4OiBpbmRleCB9KTtcblxuICAgIC8vIEF2b2lkIHJlLWNyZWF0aW5nIGNlbGxzIHdoaWxlIHNjcm9sbGluZy5cbiAgICAvLyBUaGlzIGNhbiBsZWFkIHRvIHRoZSBzYW1lIGNlbGwgYmVpbmcgY3JlYXRlZCBtYW55IHRpbWVzIGFuZCBjYW4gY2F1c2UgcGVyZm9ybWFuY2UgaXNzdWVzIGZvciBcImhlYXZ5XCIgY2VsbHMuXG4gICAgLy8gSWYgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MtIGNhY2hlIGFuZCByZXVzZSBjZWxscy5cbiAgICAvLyBUaGlzIGNhY2hlIHdpbGwgYmUgdGhyb3duIGF3YXkgb25jZSBzY3JvbGxpbmcgY29tcGxldHMuXG4gICAgdmFyIHJlbmRlcmVkQ2VsbCA9IHZvaWQgMDtcblxuICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgaWYgKCEoaW5kZXggaW4gY2VsbENhY2hlKSkge1xuICAgICAgICBjZWxsQ2FjaGVbaW5kZXhdID0gY2VsbFJlbmRlcmVyKHtcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlZENlbGwgPSBjZWxsQ2FjaGVbaW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJlZENlbGwgPSBjZWxsUmVuZGVyZXIoe1xuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIGlzU2Nyb2xsaW5nOiBpc1Njcm9sbGluZ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlbmRlcmVkQ2VsbCA9PSBudWxsIHx8IHJlbmRlcmVkQ2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6ICdDb2xsZWN0aW9uX19jZWxsJyxcbiAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBoZWlnaHQ6IGNlbGxNZXRhZGF0YS5oZWlnaHQsXG4gICAgICAgICAgbGVmdDogY2VsbE1ldGFkYXRhLngsXG4gICAgICAgICAgdG9wOiBjZWxsTWV0YWRhdGEueSxcbiAgICAgICAgICB3aWR0aDogY2VsbE1ldGFkYXRhLndpZHRoXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZW5kZXJlZENlbGxcbiAgICApO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKHJlbmRlcmVkQ2VsbCkge1xuICAgIHJldHVybiAhIXJlbmRlcmVkQ2VsbDtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIgPSByZXF1aXJlKCcuLi91dGlscy9jcmVhdGVDYWxsYmFja01lbW9pemVyJyk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDYWxsYmFja01lbW9pemVyKTtcblxudmFyIF9zY3JvbGxiYXJTaXplID0gcmVxdWlyZSgnZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplJyk7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGxiYXJTaXplKTtcblxudmFyIF9yYWYgPSByZXF1aXJlKCdyYWYnKTtcblxudmFyIF9yYWYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmFmKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLy8gQFRPRE8gSXQgd291bGQgYmUgbmljZSB0byByZWZhY3RvciBHcmlkIHRvIHVzZSB0aGlzIGNvZGUgYXMgd2VsbC5cblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaWxpc2Vjb25kcyBkdXJpbmcgd2hpY2ggdG8gZGlzYWJsZSBwb2ludGVyIGV2ZW50cyB3aGlsZSBhIHNjcm9sbCBpcyBpbiBwcm9ncmVzcy5cbiAqIFRoaXMgaW1wcm92ZXMgcGVyZm9ybWFuY2UgYW5kIG1ha2VzIHNjcm9sbGluZyBzbW9vdGhlci5cbiAqL1xudmFyIElTX1NDUk9MTElOR19USU1FT1VUID0gMTUwO1xuXG4vKipcbiAqIENvbnRyb2xzIHdoZXRoZXIgdGhlIEdyaWQgdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQncyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0ZSBvciBqdXN0IG9ic2VydmVzIGl0LlxuICogVGhpcyBwcmV2ZW50cyBHcmlkIGZyb20gaW50ZXJydXB0aW5nIG1vdXNlLXdoZWVsIGFuaW1hdGlvbnMgKHNlZSBpc3N1ZSAjMikuXG4gKi9cbnZhciBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMgPSB7XG4gIE9CU0VSVkVEOiAnb2JzZXJ2ZWQnLFxuICBSRVFVRVNURUQ6ICdyZXF1ZXN0ZWQnXG59O1xuXG4vKipcbiAqIE1vbml0b3JzIGNoYW5nZXMgaW4gcHJvcGVydGllcyAoZWcuIGNlbGxDb3VudCkgYW5kIHN0YXRlIChlZy4gc2Nyb2xsIG9mZnNldHMpIHRvIGRldGVybWluZSB3aGVuIHJlbmRlcmluZyBuZWVkcyB0byBvY2N1ci5cbiAqIFRoaXMgY29tcG9uZW50IGRvZXMgbm90IHJlbmRlciBhbnkgdmlzaWJsZSBjb250ZW50IGl0c2VsZjsgaXQgZGVmZXJzIHRvIHRoZSBzcGVjaWZpZWQgOmNlbGxMYXlvdXRNYW5hZ2VyLlxuICovXG5cbnZhciBDb2xsZWN0aW9uVmlldyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhDb2xsZWN0aW9uVmlldywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sbGVjdGlvblZpZXcocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sbGVjdGlvblZpZXcpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENvbGxlY3Rpb25WaWV3Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGVjdGlvblZpZXcpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFPbk5leHRVcGRhdGU6IGZhbHNlLFxuICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG5cbiAgICAvLyBJbnZva2VzIGNhbGxiYWNrcyBvbmx5IHdoZW4gdGhlaXIgdmFsdWVzIGhhdmUgY2hhbmdlZC5cbiAgICBfdGhpcy5fb25TZWN0aW9uUmVuZGVyZWRNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoKTtcbiAgICBfdGhpcy5fb25TY3JvbGxNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoZmFsc2UpO1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gaW5zdGFuY2Ugc28gdGhleSBkb24ndCBsb3NlIGNvbnRleHQgd2hlbiBwYXNzZWQgYXJvdW5kLlxuICAgIF90aGlzLl9pbnZva2VPblNlY3Rpb25SZW5kZXJlZEhlbHBlciA9IF90aGlzLl9pbnZva2VPblNlY3Rpb25SZW5kZXJlZEhlbHBlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uRm9yU2Nyb2xsVG9DZWxsID0gX3RoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uRm9yU2Nyb2xsVG9DZWxsLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZWQgcmVjb21wdXRlIG9mIGNlbGwgc2l6ZXMgYW5kIHBvc2l0aW9ucy5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGlmIGNlbGwgc2l6ZXMgaGF2ZSBjaGFuZ2VkIGJ1dCBub3RoaW5nIGVsc2UgaGFzLlxuICAgKiBTaW5jZSBjZWxsIHBvc2l0aW9ucyBhcmUgY2FsY3VsYXRlZCBieSBjYWxsYmFja3MsIHRoZSBjb2xsZWN0aW9uIHZpZXcgaGFzIG5vIHdheSBvZiBkZXRlY3Rpbmcgd2hlbiB0aGUgdW5kZXJseWluZyBkYXRhIGhhcyBjaGFuZ2VkLlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhDb2xsZWN0aW9uVmlldywgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVDZWxsU2l6ZXNBbmRQb3NpdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVDZWxsU2l6ZXNBbmRQb3NpdGlvbnMoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YU9uTmV4dFVwZGF0ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDb21wb25lbnQgbGlmZWN5Y2xlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHMuY2VsbExheW91dE1hbmFnZXI7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9wcm9wcy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvQ2VsbCA9IF9wcm9wcy5zY3JvbGxUb0NlbGw7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcblxuICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgd2FzIGZpcnN0IHJlbmRlcmVkIHNlcnZlci1zaWRlLCBzY3JvbGxiYXIgc2l6ZSB3aWxsIGJlIHVuZGVmaW5lZC5cbiAgICAgIC8vIEluIHRoYXQgZXZlbnQgd2UgbmVlZCB0byByZW1lYXN1cmUuXG5cbiAgICAgIGlmICghdGhpcy5fc2Nyb2xsYmFyU2l6ZU1lYXN1cmVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGJhclNpemUgPSAoMCwgX3Njcm9sbGJhclNpemUyLmRlZmF1bHQpKCk7XG4gICAgICAgIHRoaXMuX3Njcm9sbGJhclNpemVNZWFzdXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe30pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9DZWxsID49IDApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwoKTtcbiAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsTGVmdCA+PSAwIHx8IHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBvblNlY3Rpb25SZW5kZXJlZCBjYWxsYmFjay5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyKCk7XG5cbiAgICAgIHZhciBfY2VsbExheW91dE1hbmFnZXIkZ2UgPSBjZWxsTGF5b3V0TWFuYWdlci5nZXRUb3RhbFNpemUoKTtcblxuICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlLmhlaWdodDtcbiAgICAgIHZhciB0b3RhbFdpZHRoID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlLndpZHRoO1xuXG4gICAgICAvLyBJbml0aWFsaXplIG9uU2Nyb2xsIGNhbGxiYWNrLlxuXG4gICAgICB0aGlzLl9pbnZva2VPblNjcm9sbE1lbW9pemVyKHtcbiAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCB8fCAwLFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCB8fCAwLFxuICAgICAgICB0b3RhbEhlaWdodDogdG90YWxIZWlnaHQsXG4gICAgICAgIHRvdGFsV2lkdGg6IHRvdGFsV2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczIuaGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbFRvQ2VsbCA9IF9wcm9wczIuc2Nyb2xsVG9DZWxsO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMi53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IF9zdGF0ZS5zY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjtcbiAgICAgIHZhciBzY3JvbGxUb0FsaWdubWVudCA9IF9zdGF0ZS5zY3JvbGxUb0FsaWdubWVudDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuXG4gICAgICAvLyBNYWtlIHN1cmUgcmVxdWVzdGVkIGNoYW5nZXMgdG8gOnNjcm9sbExlZnQgb3IgOnNjcm9sbFRvcCBnZXQgYXBwbGllZC5cbiAgICAgIC8vIEFzc2lnbmluZyB0byBzY3JvbGxMZWZ0L3Njcm9sbFRvcCB0ZWxscyB0aGUgYnJvd3NlciB0byBpbnRlcnJ1cHQgYW55IHJ1bm5pbmcgc2Nyb2xsIGFuaW1hdGlvbnMsXG4gICAgICAvLyBBbmQgdG8gZGlzY2FyZCBhbnkgcGVuZGluZyBhc3luYyBjaGFuZ2VzIHRvIHRoZSBzY3JvbGwgcG9zaXRpb24gdGhhdCBtYXkgaGF2ZSBoYXBwZW5lZCBpbiB0aGUgbWVhbnRpbWUgKGUuZy4gb24gYSBzZXBhcmF0ZSBzY3JvbGxpbmcgdGhyZWFkKS5cbiAgICAgIC8vIFNvIHdlIG9ubHkgc2V0IHRoZXNlIHdoZW4gd2UgcmVxdWlyZSBhbiBhZGp1c3RtZW50IG9mIHRoZSBzY3JvbGwgcG9zaXRpb24uXG4gICAgICAvLyBTZWUgaXNzdWUgIzIgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9PT0gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRCkge1xuICAgICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHByZXZTdGF0ZS5zY3JvbGxMZWZ0ICYmIHNjcm9sbExlZnQgIT09IHRoaXMuX3Njcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHByZXZTdGF0ZS5zY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLl9zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgc2Nyb2xsIG9mZnNldHMgaWYgdGhlIGN1cnJlbnQgOnNjcm9sbFRvQ2VsbCB2YWx1ZXMgcmVxdWlyZXMgaXRcbiAgICAgIGlmIChoZWlnaHQgIT09IHByZXZQcm9wcy5oZWlnaHQgfHwgc2Nyb2xsVG9BbGlnbm1lbnQgIT09IHByZXZQcm9wcy5zY3JvbGxUb0FsaWdubWVudCB8fCBzY3JvbGxUb0NlbGwgIT09IHByZXZQcm9wcy5zY3JvbGxUb0NlbGwgfHwgd2lkdGggIT09IHByZXZQcm9wcy53aWR0aCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2sgaWYgc3RhcnQvc3RvcCBpbmRpY2VzIGhhdmUgY2hhbmdlZFxuICAgICAgdGhpcy5faW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSB0aGlzLnByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyO1xuXG5cbiAgICAgIGNlbGxMYXlvdXRNYW5hZ2VyLmNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoKTtcblxuICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgaXMgYmVpbmcgcmVuZGVyZWQgc2VydmVyLXNpZGUsIGdldFNjcm9sbGJhclNpemUoKSB3aWxsIHJldHVybiB1bmRlZmluZWQuXG4gICAgICAvLyBXZSBoYW5kbGUgdGhpcyBjYXNlIGluIGNvbXBvbmVudERpZE1vdW50KClcbiAgICAgIHRoaXMuX3Njcm9sbGJhclNpemUgPSAoMCwgX3Njcm9sbGJhclNpemUyLmRlZmF1bHQpKCk7XG4gICAgICBpZiAodGhpcy5fc2Nyb2xsYmFyU2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGJhclNpemVNZWFzdXJlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJTaXplID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbGJhclNpemVNZWFzdXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBFbXB0eSBjb250ZW50ICgwIHJvd3Mgb3IgY29sdW1ucylcbiAgICAgKiAyKSBOZXcgc2Nyb2xsIHByb3BzIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiAzKSBDZWxscy1jb3VudCBvciBjZWxscy1zaXplIGhhcyBjaGFuZ2VkLCBtYWtpbmcgcHJldmlvdXMgc2Nyb2xsIG9mZnNldHMgaW52YWxpZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgaWYgKG5leHRQcm9wcy5jZWxsQ291bnQgPT09IDAgJiYgKG5leHRTdGF0ZS5zY3JvbGxMZWZ0ICE9PSAwIHx8IG5leHRTdGF0ZS5zY3JvbGxUb3AgIT09IDApKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFByb3BzLnNjcm9sbExlZnQgIT09IHRoaXMucHJvcHMuc2Nyb2xsTGVmdCB8fCBuZXh0UHJvcHMuc2Nyb2xsVG9wICE9PSB0aGlzLnByb3BzLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbmV4dFByb3BzLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBuZXh0UHJvcHMuc2Nyb2xsVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dFByb3BzLmNlbGxDb3VudCAhPT0gdGhpcy5wcm9wcy5jZWxsQ291bnQgfHwgbmV4dFByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyICE9PSB0aGlzLnByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyIHx8IG5leHRTdGF0ZS5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlKSB7XG4gICAgICAgIG5leHRQcm9wcy5jZWxsTGF5b3V0TWFuYWdlci5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0U3RhdGUuY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YU9uTmV4dFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGF1dG9IZWlnaHQgPSBfcHJvcHMzLmF1dG9IZWlnaHQ7XG4gICAgICB2YXIgY2VsbENvdW50ID0gX3Byb3BzMy5jZWxsQ291bnQ7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHMzLmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wczMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczMuaGVpZ2h0O1xuICAgICAgdmFyIGhvcml6b250YWxPdmVyc2NhblNpemUgPSBfcHJvcHMzLmhvcml6b250YWxPdmVyc2NhblNpemU7XG4gICAgICB2YXIgbm9Db250ZW50UmVuZGVyZXIgPSBfcHJvcHMzLm5vQ29udGVudFJlbmRlcmVyO1xuICAgICAgdmFyIHN0eWxlID0gX3Byb3BzMy5zdHlsZTtcbiAgICAgIHZhciB2ZXJ0aWNhbE92ZXJzY2FuU2l6ZSA9IF9wcm9wczMudmVydGljYWxPdmVyc2NhblNpemU7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMzLndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZTIgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3N0YXRlMi5pc1Njcm9sbGluZztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlMi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZTIuc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMiA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfY2VsbExheW91dE1hbmFnZXIkZ2UyLmhlaWdodDtcbiAgICAgIHZhciB0b3RhbFdpZHRoID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMi53aWR0aDtcblxuICAgICAgLy8gU2FmZWx5IGV4cGFuZCB0aGUgcmVuZGVyZWQgYXJlYSBieSB0aGUgc3BlY2lmaWVkIG92ZXJzY2FuIGFtb3VudFxuXG4gICAgICB2YXIgbGVmdCA9IE1hdGgubWF4KDAsIHNjcm9sbExlZnQgLSBob3Jpem9udGFsT3ZlcnNjYW5TaXplKTtcbiAgICAgIHZhciB0b3AgPSBNYXRoLm1heCgwLCBzY3JvbGxUb3AgLSB2ZXJ0aWNhbE92ZXJzY2FuU2l6ZSk7XG4gICAgICB2YXIgcmlnaHQgPSBNYXRoLm1pbih0b3RhbFdpZHRoLCBzY3JvbGxMZWZ0ICsgd2lkdGggKyBob3Jpem9udGFsT3ZlcnNjYW5TaXplKTtcbiAgICAgIHZhciBib3R0b20gPSBNYXRoLm1pbih0b3RhbEhlaWdodCwgc2Nyb2xsVG9wICsgaGVpZ2h0ICsgdmVydGljYWxPdmVyc2NhblNpemUpO1xuXG4gICAgICB2YXIgY2hpbGRyZW5Ub0Rpc3BsYXkgPSBoZWlnaHQgPiAwICYmIHdpZHRoID4gMCA/IGNlbGxMYXlvdXRNYW5hZ2VyLmNlbGxSZW5kZXJlcnMoe1xuICAgICAgICBoZWlnaHQ6IGJvdHRvbSAtIHRvcCxcbiAgICAgICAgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nLFxuICAgICAgICB3aWR0aDogcmlnaHQgLSBsZWZ0LFxuICAgICAgICB4OiBsZWZ0LFxuICAgICAgICB5OiB0b3BcbiAgICAgIH0pIDogW107XG5cbiAgICAgIHZhciBjb2xsZWN0aW9uU3R5bGUgPSB7XG4gICAgICAgIGhlaWdodDogYXV0b0hlaWdodCA/ICdhdXRvJyA6IGhlaWdodCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9O1xuXG4gICAgICAvLyBGb3JjZSBicm93c2VyIHRvIGhpZGUgc2Nyb2xsYmFycyB3aGVuIHdlIGtub3cgdGhleSBhcmVuJ3QgbmVjZXNzYXJ5LlxuICAgICAgLy8gT3RoZXJ3aXNlIG9uY2Ugc2Nyb2xsYmFycyBhcHBlYXIgdGhleSBtYXkgbm90IGRpc2FwcGVhciBhZ2Fpbi5cbiAgICAgIC8vIEZvciBtb3JlIGluZm8gc2VlIGlzc3VlICMxMTZcbiAgICAgIHZhciB2ZXJ0aWNhbFNjcm9sbEJhclNpemUgPSB0b3RhbEhlaWdodCA+IGhlaWdodCA/IHRoaXMuX3Njcm9sbGJhclNpemUgOiAwO1xuICAgICAgdmFyIGhvcml6b250YWxTY3JvbGxCYXJTaXplID0gdG90YWxXaWR0aCA+IHdpZHRoID8gdGhpcy5fc2Nyb2xsYmFyU2l6ZSA6IDA7XG4gICAgICBpZiAodG90YWxXaWR0aCArIHZlcnRpY2FsU2Nyb2xsQmFyU2l6ZSA8PSB3aWR0aCkge1xuICAgICAgICBjb2xsZWN0aW9uU3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgICBpZiAodG90YWxIZWlnaHQgKyBob3Jpem9udGFsU2Nyb2xsQmFyU2l6ZSA8PSBoZWlnaHQpIHtcbiAgICAgICAgY29sbGVjdGlvblN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiBmdW5jdGlvbiByZWYoX3JlZikge1xuICAgICAgICAgICAgX3RoaXMyLl9zY3JvbGxpbmdDb250YWluZXIgPSBfcmVmO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdDb2xsZWN0aW9uJywgY2xhc3NOYW1lKSxcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgcm9sZTogJ2dyaWQnLFxuICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgY29sbGVjdGlvblN0eWxlLCBzdHlsZSksXG4gICAgICAgICAgdGFiSW5kZXg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbENvdW50ID4gMCAmJiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdDb2xsZWN0aW9uX19pbm5lclNjcm9sbENvbnRhaW5lcicsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBoZWlnaHQ6IHRvdGFsSGVpZ2h0LFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRvdGFsSGVpZ2h0LFxuICAgICAgICAgICAgICBtYXhXaWR0aDogdG90YWxXaWR0aCxcbiAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogaXNTY3JvbGxpbmcgPyAnbm9uZScgOiAnJyxcbiAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5XG4gICAgICAgICksXG4gICAgICAgIGNlbGxDb3VudCA9PT0gMCAmJiBub0NvbnRlbnRSZW5kZXJlcigpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGVscGVyIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiA6aXNTY3JvbGxpbmcgZmxhZyBmb3IgYSBzbWFsbCB3aW5kb3cgb2YgdGltZS5cbiAgICAgKiBUaGlzIGZsYWcgaXMgdXNlZCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIG9uIHRoZSBzY3JvbGxhYmxlIHBvcnRpb24gb2YgdGhlIENvbGxlY3Rpb24uXG4gICAgICogVGhpcyBwcmV2ZW50cyBqZXJreS9zdHV0dGVyeSBtb3VzZS13aGVlbCBzY3JvbGxpbmcuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlzU2Nyb2xsaW5nQ2hhbmdlID0gX3RoaXMzLnByb3BzLmlzU2Nyb2xsaW5nQ2hhbmdlO1xuXG5cbiAgICAgICAgaXNTY3JvbGxpbmdDaGFuZ2UoZmFsc2UpO1xuXG4gICAgICAgIF90aGlzMy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICBfdGhpczMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0sIElTX1NDUk9MTElOR19USU1FT1VUKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHM0LmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIG9uU2VjdGlvblJlbmRlcmVkID0gX3Byb3BzNC5vblNlY3Rpb25SZW5kZXJlZDtcblxuXG4gICAgICB0aGlzLl9vblNlY3Rpb25SZW5kZXJlZE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IG9uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgaW5kaWNlczogY2VsbExheW91dE1hbmFnZXIuZ2V0TGFzdFJlbmRlcmVkSW5kaWNlcygpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPblNjcm9sbE1lbW9pemVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoX3JlZjIpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYyLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjIuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gX3JlZjIudG90YWxIZWlnaHQ7XG4gICAgICB2YXIgdG90YWxXaWR0aCA9IF9yZWYyLnRvdGFsV2lkdGg7XG5cbiAgICAgIHRoaXMuX29uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soX3JlZjMpIHtcbiAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYzLnNjcm9sbExlZnQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYzLnNjcm9sbFRvcDtcbiAgICAgICAgICB2YXIgX3Byb3BzNSA9IF90aGlzNC5wcm9wcztcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNS5oZWlnaHQ7XG4gICAgICAgICAgdmFyIG9uU2Nyb2xsID0gX3Byb3BzNS5vblNjcm9sbDtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcHJvcHM1LndpZHRoO1xuXG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aDogdG90YWxXaWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSBkdXJpbmcgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lLlxuICAgICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhdm9pZCBtdWx0aXBsZSByZW5kZXJzIGluIGEgc21hbGwgc3BhbiBvZiB0aW1lLlxuICAgICAqIFRoaXMgaGVscHMgcGVyZm9ybWFuY2UgZm9yIGJ1cnN0eSBldmVudHMgKGxpa2Ugb25TY3JvbGwpLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0TmV4dFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldE5leHRTdGF0ZShzdGF0ZSkge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIF9yYWYyLmRlZmF1bHQuY2FuY2VsKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gKDAsIF9yYWYyLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM1Ll9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICAgICAgX3RoaXM1LnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxQb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxQb3NpdGlvbihfcmVmNCkge1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmNC5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWY0LnNjcm9sbFRvcDtcblxuICAgICAgdmFyIG5ld1N0YXRlID0ge1xuICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRFxuICAgICAgfTtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCkge1xuICAgICAgICBuZXdTdGF0ZS5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnN0YXRlLnNjcm9sbExlZnQgfHwgc2Nyb2xsVG9wID49IDAgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnN0YXRlLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwoKSB7XG4gICAgICB2YXIgX3Byb3BzNiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHM2LmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczYuaGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbFRvQWxpZ25tZW50ID0gX3Byb3BzNi5zY3JvbGxUb0FsaWdubWVudDtcbiAgICAgIHZhciBzY3JvbGxUb0NlbGwgPSBfcHJvcHM2LnNjcm9sbFRvQ2VsbDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczYud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlMyA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZTMuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUzLnNjcm9sbFRvcDtcblxuXG4gICAgICBpZiAoc2Nyb2xsVG9DZWxsID49IDApIHtcbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gY2VsbExheW91dE1hbmFnZXIuZ2V0U2Nyb2xsUG9zaXRpb25Gb3JDZWxsKHtcbiAgICAgICAgICBhbGlnbjogc2Nyb2xsVG9BbGlnbm1lbnQsXG4gICAgICAgICAgY2VsbEluZGV4OiBzY3JvbGxUb0NlbGwsXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQgfHwgc2Nyb2xsUG9zaXRpb24uc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbihzY3JvbGxQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIEluIGNlcnRhaW4gZWRnZS1jYXNlcyBSZWFjdCBkaXNwYXRjaGVzIGFuIG9uU2Nyb2xsIGV2ZW50IHdpdGggYW4gaW52YWxpZCB0YXJnZXQuc2Nyb2xsTGVmdCAvIHRhcmdldC5zY3JvbGxUb3AuXG4gICAgICAvLyBUaGlzIGludmFsaWQgZXZlbnQgY2FuIGJlIGRldGVjdGVkIGJ5IGNvbXBhcmluZyBldmVudC50YXJnZXQgdG8gdGhpcyBjb21wb25lbnQncyBzY3JvbGxhYmxlIERPTSBlbGVtZW50LlxuICAgICAgLy8gU2VlIGlzc3VlICM0MDQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9zY3JvbGxpbmdDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IHBvaW50ZXIgZXZlbnRzIGZyb20gaW50ZXJydXB0aW5nIGEgc21vb3RoIHNjcm9sbFxuICAgICAgdGhpcy5fZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKTtcblxuICAgICAgLy8gV2hlbiB0aGlzIGNvbXBvbmVudCBpcyBzaHJ1bmsgZHJhc3RpY2FsbHksIFJlYWN0IGRpc3BhdGNoZXMgYSBzZXJpZXMgb2YgYmFjay10by1iYWNrIHNjcm9sbCBldmVudHMsXG4gICAgICAvLyBHcmFkdWFsbHkgY29udmVyZ2luZyBvbiBhIHNjcm9sbFRvcCB0aGF0IGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBuZXcsIHNtYWxsZXIgaGVpZ2h0LlxuICAgICAgLy8gVGhpcyBjYXVzZXMgYSBzZXJpZXMgb2YgcmFwaWQgcmVuZGVycyB0aGF0IGlzIHNsb3cgZm9yIGxvbmcgbGlzdHMuXG4gICAgICAvLyBXZSBjYW4gYXZvaWQgdGhhdCBieSBkb2luZyBzb21lIHNpbXBsZSBib3VuZHMgY2hlY2tpbmcgdG8gZW5zdXJlIHRoYXQgc2Nyb2xsVG9wIG5ldmVyIGV4Y2VlZHMgdGhlIHRvdGFsIGhlaWdodC5cbiAgICAgIHZhciBfcHJvcHM3ID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsTGF5b3V0TWFuYWdlciA9IF9wcm9wczcuY2VsbExheW91dE1hbmFnZXI7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNy5oZWlnaHQ7XG4gICAgICB2YXIgaXNTY3JvbGxpbmdDaGFuZ2UgPSBfcHJvcHM3LmlzU2Nyb2xsaW5nQ2hhbmdlO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNy53aWR0aDtcblxuICAgICAgdmFyIHNjcm9sbGJhclNpemUgPSB0aGlzLl9zY3JvbGxiYXJTaXplO1xuXG4gICAgICB2YXIgX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMyA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfY2VsbExheW91dE1hbmFnZXIkZ2UzLmhlaWdodDtcbiAgICAgIHZhciB0b3RhbFdpZHRoID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMy53aWR0aDtcblxuICAgICAgdmFyIHNjcm9sbExlZnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbFdpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCkpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRvdGFsSGVpZ2h0IC0gaGVpZ2h0ICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCkpO1xuXG4gICAgICAvLyBDZXJ0YWluIGRldmljZXMgKGxpa2UgQXBwbGUgdG91Y2hwYWQpIHJhcGlkLWZpcmUgZHVwbGljYXRlIGV2ZW50cy5cbiAgICAgIC8vIERvbid0IGZvcmNlIGEgcmUtcmVuZGVyIGlmIHRoaXMgaXMgdGhlIGNhc2UuXG4gICAgICAvLyBUaGUgbW91c2UgbWF5IG1vdmUgZmFzdGVyIHRoZW4gdGhlIGFuaW1hdGlvbiBmcmFtZSBkb2VzLlxuICAgICAgLy8gVXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0byBhdm9pZCBvdmVyLXVwZGF0aW5nLlxuICAgICAgaWYgKHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCAhPT0gc2Nyb2xsTGVmdCB8fCB0aGlzLnN0YXRlLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIHdpdGggY2FuY2VsYWJsZSBzY3JvbGwgZXZlbnRzIChlZy4gRmlyZWZveCkgaW50ZXJydXB0IHNjcm9sbGluZyBhbmltYXRpb25zIGlmIHNjcm9sbFRvcC9zY3JvbGxMZWZ0IGlzIHNldC5cbiAgICAgICAgLy8gT3RoZXIgYnJvd3NlcnMgKGVnLiBTYWZhcmkpIGRvbid0IHNjcm9sbCBhcyB3ZWxsIHdpdGhvdXQgdGhlIGhlbHAgdW5kZXIgY2VydGFpbiBjb25kaXRpb25zIChET00gb3Igc3R5bGUgY2hhbmdlcyBkdXJpbmcgc2Nyb2xsaW5nKS5cbiAgICAgICAgLy8gQWxsIHRoaW5ncyBjb25zaWRlcmVkLCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBiZXN0IGN1cnJlbnQgd29yayBhcm91bmQgdGhhdCBJJ20gYXdhcmUgb2YuXG4gICAgICAgIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC9wdWxsLzEyNFxuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBldmVudC5jYW5jZWxhYmxlID8gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLk9CU0VSVkVEIDogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRDtcblxuICAgICAgICAvLyBTeW5jaHJvbm91c2x5IHNldCA6aXNTY3JvbGxpbmcgdGhlIGZpcnN0IHRpbWUgKHNpbmNlIF9zZXROZXh0U3RhdGUgd2lsbCByZXNjaGVkdWxlIGl0cyBhbmltYXRpb24gZnJhbWUgZWFjaCB0aW1lIGl0J3MgY2FsbGVkKVxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBpc1Njcm9sbGluZ0NoYW5nZSh0cnVlKTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24sXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgdG90YWxXaWR0aDogdG90YWxXaWR0aCxcbiAgICAgICAgdG90YWxIZWlnaHQ6IHRvdGFsSGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sbGVjdGlvblZpZXc7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Db2xsZWN0aW9uVmlldy5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZml4ZWQgaGVpZ2h0IGZyb20gdGhlIHNjcm9sbGluZ0NvbnRhaW5lciBzbyB0aGF0IHRoZSB0b3RhbCBoZWlnaHRcbiAgICogb2Ygcm93cyBjYW4gc3RyZXRjaCB0aGUgd2luZG93LiBJbnRlbmRlZCBmb3IgdXNlIHdpdGggV2luZG93U2Nyb2xsZXJcbiAgICovXG4gIGF1dG9IZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNlbGxzIGluIGNvbGxlY3Rpb24uXG4gICAqL1xuICBjZWxsQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgY2VsbCBzaXplcyBhbmQgcG9zaXRpb25zIGFuZCBtYW5hZ2VzIHJlbmRlcmluZyB0aGUgYXBwcm9wcmlhdGUgY2VsbHMgZ2l2ZW4gYSBzcGVjaWZpZWQgd2luZG93LlxuICAgKi9cbiAgY2VsbExheW91dE1hbmFnZXI6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgbmFtZSB0byBhdHRhY2ggdG8gcm9vdCBDb2xsZWN0aW9uIGVsZW1lbnQuXG4gICAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgQ29sbGVjdGlvbjsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIHJvd3MuXG4gICAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIGBDb2xsZWN0aW9uYCB0byBob3Jpb250YWxseSBcIm92ZXJzY2FuXCIgaXRzIGNvbnRlbnQgc2ltaWxhciB0byBob3cgYEdyaWRgIGRvZXMuXG4gICAqIFRoaXMgY2FuIHJlZHVjZSBmbGlja2VyIGFyb3VuZCB0aGUgZWRnZXMgd2hlbiBhIHVzZXIgc2Nyb2xscyBxdWlja2x5LlxuICAgKi9cbiAgaG9yaXpvbnRhbE92ZXJzY2FuU2l6ZTogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICBpc1Njcm9sbGluZ0NoYW5nZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiBlaXRoZXIgOnJvd0NvdW50IG9yIDpjZWxsQ291bnQgaXMgMC5cbiAgICovXG4gIG5vQ29udGVudFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VjdGlvbiBvZiB0aGUgQ29sbGVjdGlvbiB0aGF0IHdhcyBqdXN0IHJlbmRlcmVkLlxuICAgKiBUaGlzIGNhbGxiYWNrIGlzIHBhc3NlZCBhIG5hbWVkIDppbmRpY2VzIHBhcmFtZXRlciB3aGljaCBpcyBhbiBBcnJheSBvZiB0aGUgbW9zdCByZWNlbnRseSByZW5kZXJlZCBzZWN0aW9uIGluZGljZXMuXG4gICAqL1xuICBvblNlY3Rpb25SZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgb2Zmc2V0LlxuICAgKi9cbiAgc2Nyb2xsTGVmdDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIENvbnRyb2xzIHNjcm9sbC10by1jZWxsIGJlaGF2aW9yIG9mIHRoZSBHcmlkLlxuICAgKiBUaGUgZGVmYXVsdCAoXCJhdXRvXCIpIHNjcm9sbHMgdGhlIGxlYXN0IGFtb3VudCBwb3NzaWJsZSB0byBlbnN1cmUgdGhhdCB0aGUgc3BlY2lmaWVkIGNlbGwgaXMgZnVsbHkgdmlzaWJsZS5cbiAgICogVXNlIFwic3RhcnRcIiB0byBhbGlnbiBjZWxscyB0byB0aGUgdG9wL2xlZnQgb2YgdGhlIEdyaWQgYW5kIFwiZW5kXCIgdG8gYWxpZ24gYm90dG9tL3JpZ2h0LlxuICAgKi9cbiAgc2Nyb2xsVG9BbGlnbm1lbnQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2YoWydhdXRvJywgJ2VuZCcsICdzdGFydCcsICdjZW50ZXInXSkuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2VsbCBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KS5cbiAgICovXG4gIHNjcm9sbFRvQ2VsbDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFZlcnRpY2FsIG9mZnNldC5cbiAgICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbSBpbmxpbmUgc3R5bGUgdG8gYXR0YWNoIHRvIHJvb3QgQ29sbGVjdGlvbiBlbGVtZW50LlxuICAgKi9cbiAgc3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSBgQ29sbGVjdGlvbmAgdG8gdmVydGljYWxseSBcIm92ZXJzY2FuXCIgaXRzIGNvbnRlbnQgc2ltaWxhciB0byBob3cgYEdyaWRgIGRvZXMuXG4gICAqIFRoaXMgY2FuIHJlZHVjZSBmbGlja2VyIGFyb3VuZCB0aGUgZWRnZXMgd2hlbiBhIHVzZXIgc2Nyb2xscyBxdWlja2x5LlxuICAgKi9cbiAgdmVydGljYWxPdmVyc2NhblNpemU6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIENvbGxlY3Rpb247IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSBjb2x1bW5zLlxuICAgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5Db2xsZWN0aW9uVmlldy5kZWZhdWx0UHJvcHMgPSB7XG4gICdhcmlhLWxhYmVsJzogJ2dyaWQnLFxuICBob3Jpem9udGFsT3ZlcnNjYW5TaXplOiAwLFxuICBub0NvbnRlbnRSZW5kZXJlcjogZnVuY3Rpb24gbm9Db250ZW50UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TZWN0aW9uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uU2VjdGlvblJlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBzY3JvbGxUb0FsaWdubWVudDogJ2F1dG8nLFxuICBzdHlsZToge30sXG4gIHZlcnRpY2FsT3ZlcnNjYW5TaXplOiAwXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGVjdGlvblZpZXc7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEEgc2VjdGlvbiBvZiB0aGUgV2luZG93LlxuICogV2luZG93IFNlY3Rpb25zIGFyZSB1c2VkIHRvIGdyb3VwIG5lYXJieSBjZWxscy5cbiAqIFRoaXMgZW5hYmxlcyB1cyB0byBtb3JlIHF1aWNrbHkgZGV0ZXJtaW5lIHdoaWNoIGNlbGxzIHRvIGRpc3BsYXkgaW4gYSBnaXZlbiByZWdpb24gb2YgdGhlIFdpbmRvdy5cbiAqIFNlY3Rpb25zIGhhdmUgYSBmaXhlZCBzaXplIGFuZCBjb250YWluIDAgdG8gbWFueSBjZWxscyAodHJhY2tlZCBieSB0aGVpciBpbmRpY2VzKS5cbiAqL1xudmFyIFNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlY3Rpb24oX3JlZikge1xuICAgIHZhciBoZWlnaHQgPSBfcmVmLmhlaWdodDtcbiAgICB2YXIgd2lkdGggPSBfcmVmLndpZHRoO1xuICAgIHZhciB4ID0gX3JlZi54O1xuICAgIHZhciB5ID0gX3JlZi55O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNlY3Rpb24pO1xuXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMuX2luZGV4TWFwID0ge307XG4gICAgdGhpcy5faW5kaWNlcyA9IFtdO1xuICB9XG5cbiAgLyoqIEFkZCBhIGNlbGwgdG8gdGhpcyBzZWN0aW9uLiAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFNlY3Rpb24sIFt7XG4gICAga2V5OiAnYWRkQ2VsbEluZGV4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ2VsbEluZGV4KF9yZWYyKSB7XG4gICAgICB2YXIgaW5kZXggPSBfcmVmMi5pbmRleDtcblxuICAgICAgaWYgKCF0aGlzLl9pbmRleE1hcFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5faW5kZXhNYXBbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBjZWxsIGluZGljZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhpcyBzZWN0aW9uLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDZWxsSW5kaWNlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxJbmRpY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgfVxuXG4gICAgLyoqIEludGVuZGVkIGZvciBkZWJ1Z2dlci90ZXN0IHB1cnBvc2VzIG9ubHkgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnICcgKyB0aGlzLndpZHRoICsgJ3gnICsgdGhpcy5oZWlnaHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNlY3Rpb247XG59KCk7IC8qKiBAcmxvdyAqL1xuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY3Rpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpOyAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBXaW5kb3cgU2VjdGlvbnMgYXJlIHVzZWQgdG8gZ3JvdXAgbmVhcmJ5IGNlbGxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFRoaXMgZW5hYmxlcyB1cyB0byBtb3JlIHF1aWNrbHkgZGV0ZXJtaW5lIHdoaWNoIGNlbGxzIHRvIGRpc3BsYXkgaW4gYSBnaXZlbiByZWdpb24gb2YgdGhlIFdpbmRvdy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuXG52YXIgX1NlY3Rpb24gPSByZXF1aXJlKCcuL1NlY3Rpb24nKTtcblxudmFyIF9TZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU0VDVElPTl9TSVpFID0gMTAwO1xuXG4vKipcbiAqIENvbnRhaW5zIDAgdG8gbWFueSBTZWN0aW9ucy5cbiAqIEdyb3dzIChhbmQgYWRkcyBTZWN0aW9ucykgZHluYW1pY2FsbHkgYXMgY2VsbHMgYXJlIHJlZ2lzdGVyZWQuXG4gKiBBdXRvbWF0aWNhbGx5IGFkZHMgY2VsbHMgdG8gdGhlIGFwcHJvcHJpYXRlIFNlY3Rpb24ocykuXG4gKi9cbnZhciBTZWN0aW9uTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2VjdGlvbk1hbmFnZXIoKSB7XG4gICAgdmFyIHNlY3Rpb25TaXplID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gU0VDVElPTl9TSVpFIDogYXJndW1lbnRzWzBdO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNlY3Rpb25NYW5hZ2VyKTtcblxuICAgIHRoaXMuX3NlY3Rpb25TaXplID0gc2VjdGlvblNpemU7XG5cbiAgICB0aGlzLl9jZWxsTWV0YWRhdGEgPSBbXTtcbiAgICB0aGlzLl9zZWN0aW9ucyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGNlbGwgaW5kaWNlcyBjb250YWluZWQgaW4gdGhlIHNwZWNpZmllZCByZWdpb24uXG4gICAqIEEgcmVnaW9uIG1heSBlbmNvbXBhc3MgMSBvciBtb3JlIFNlY3Rpb25zLlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhTZWN0aW9uTWFuYWdlciwgW3tcbiAgICBrZXk6ICdnZXRDZWxsSW5kaWNlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxJbmRpY2VzKF9yZWYpIHtcbiAgICAgIHZhciBoZWlnaHQgPSBfcmVmLmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYud2lkdGg7XG4gICAgICB2YXIgeCA9IF9yZWYueDtcbiAgICAgIHZhciB5ID0gX3JlZi55O1xuXG4gICAgICB2YXIgaW5kaWNlcyA9IHt9O1xuXG4gICAgICB0aGlzLmdldFNlY3Rpb25zKHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCwgeDogeCwgeTogeSB9KS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWN0aW9uLmdldENlbGxJbmRpY2VzKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICBpbmRpY2VzW2luZGV4XSA9IGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBPYmplY3Qga2V5cyBhcmUgc3RyaW5nczsgdGhpcyBmdW5jdGlvbiByZXR1cm5zIG51bWJlcnNcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpbmRpY2VzKS5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRpY2VzW2luZGV4XTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZXQgc2l6ZSBhbmQgcG9zaXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBjZWxsIHNwZWNpZmllZC4gKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2VsbE1ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbE1ldGFkYXRhKF9yZWYyKSB7XG4gICAgICB2YXIgaW5kZXggPSBfcmVmMi5pbmRleDtcblxuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNZXRhZGF0YVtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbGwgU2VjdGlvbnMgb3ZlcmxhcHBpbmcgdGhlIHNwZWNpZmllZCByZWdpb24uICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFNlY3Rpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2VjdGlvbnMoX3JlZjMpIHtcbiAgICAgIHZhciBoZWlnaHQgPSBfcmVmMy5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmMy53aWR0aDtcbiAgICAgIHZhciB4ID0gX3JlZjMueDtcbiAgICAgIHZhciB5ID0gX3JlZjMueTtcblxuICAgICAgdmFyIHNlY3Rpb25YU3RhcnQgPSBNYXRoLmZsb29yKHggLyB0aGlzLl9zZWN0aW9uU2l6ZSk7XG4gICAgICB2YXIgc2VjdGlvblhTdG9wID0gTWF0aC5mbG9vcigoeCArIHdpZHRoIC0gMSkgLyB0aGlzLl9zZWN0aW9uU2l6ZSk7XG4gICAgICB2YXIgc2VjdGlvbllTdGFydCA9IE1hdGguZmxvb3IoeSAvIHRoaXMuX3NlY3Rpb25TaXplKTtcbiAgICAgIHZhciBzZWN0aW9uWVN0b3AgPSBNYXRoLmZsb29yKCh5ICsgaGVpZ2h0IC0gMSkgLyB0aGlzLl9zZWN0aW9uU2l6ZSk7XG5cbiAgICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBzZWN0aW9uWCA9IHNlY3Rpb25YU3RhcnQ7IHNlY3Rpb25YIDw9IHNlY3Rpb25YU3RvcDsgc2VjdGlvblgrKykge1xuICAgICAgICBmb3IgKHZhciBzZWN0aW9uWSA9IHNlY3Rpb25ZU3RhcnQ7IHNlY3Rpb25ZIDw9IHNlY3Rpb25ZU3RvcDsgc2VjdGlvblkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBzZWN0aW9uWCArICcuJyArIHNlY3Rpb25ZO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLl9zZWN0aW9uc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWN0aW9uc1trZXldID0gbmV3IF9TZWN0aW9uMi5kZWZhdWx0KHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9zZWN0aW9uU2l6ZSxcbiAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuX3NlY3Rpb25TaXplLFxuICAgICAgICAgICAgICB4OiBzZWN0aW9uWCAqIHRoaXMuX3NlY3Rpb25TaXplLFxuICAgICAgICAgICAgICB5OiBzZWN0aW9uWSAqIHRoaXMuX3NlY3Rpb25TaXplXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRoaXMuX3NlY3Rpb25zW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWN0aW9ucztcbiAgICB9XG5cbiAgICAvKiogVG90YWwgbnVtYmVyIG9mIFNlY3Rpb25zIGJhc2VkIG9uIHRoZSBjdXJyZW50bHkgcmVnaXN0ZXJlZCBjZWxscy4gKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0VG90YWxTZWN0aW9uQ291bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUb3RhbFNlY3Rpb25Db3VudCgpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zZWN0aW9ucykubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKiBJbnRlbmRlZCBmb3IgZGVidWdnZXIvdGVzdCBwdXJwb3NlcyBvbmx5ICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2VjdGlvbnMpLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLl9zZWN0aW9uc1tpbmRleF0udG9TdHJpbmcoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBBZGRzIGEgY2VsbCB0byB0aGUgYXBwcm9wcmlhdGUgU2VjdGlvbnMgYW5kIHJlZ2lzdGVycyBpdCBtZXRhZGF0YSBmb3IgbGF0ZXIgcmV0cmlldmFibGUuICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlZ2lzdGVyQ2VsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyQ2VsbChfcmVmNCkge1xuICAgICAgdmFyIGNlbGxNZXRhZGF0dW0gPSBfcmVmNC5jZWxsTWV0YWRhdHVtO1xuICAgICAgdmFyIGluZGV4ID0gX3JlZjQuaW5kZXg7XG5cbiAgICAgIHRoaXMuX2NlbGxNZXRhZGF0YVtpbmRleF0gPSBjZWxsTWV0YWRhdHVtO1xuXG4gICAgICB0aGlzLmdldFNlY3Rpb25zKGNlbGxNZXRhZGF0dW0pLmZvckVhY2goZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uYWRkQ2VsbEluZGV4KHsgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNlY3Rpb25NYW5hZ2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTZWN0aW9uTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQ29sbGVjdGlvbjIgPSByZXF1aXJlKCcuL0NvbGxlY3Rpb24nKTtcblxudmFyIF9Db2xsZWN0aW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbGxlY3Rpb24yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NvbGxlY3Rpb24zLmRlZmF1bHQ7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBfQ29sbGVjdGlvbjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhO1xuXG52YXIgX1NlY3Rpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi4vU2VjdGlvbk1hbmFnZXInKTtcblxudmFyIF9TZWN0aW9uTWFuYWdlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZWN0aW9uTWFuYWdlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyID0gX3JlZi5jZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyO1xuICB2YXIgc2VjdGlvblNpemUgPSBfcmVmLnNlY3Rpb25TaXplO1xuXG4gIHZhciBjZWxsTWV0YWRhdGEgPSBbXTtcbiAgdmFyIHNlY3Rpb25NYW5hZ2VyID0gbmV3IF9TZWN0aW9uTWFuYWdlcjIuZGVmYXVsdChzZWN0aW9uU2l6ZSk7XG4gIHZhciBoZWlnaHQgPSAwO1xuICB2YXIgd2lkdGggPSAwO1xuXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBjZWxsQ291bnQ7IGluZGV4KyspIHtcbiAgICB2YXIgY2VsbE1ldGFkYXR1bSA9IGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIoeyBpbmRleDogaW5kZXggfSk7XG5cbiAgICBpZiAoY2VsbE1ldGFkYXR1bS5oZWlnaHQgPT0gbnVsbCB8fCBpc05hTihjZWxsTWV0YWRhdHVtLmhlaWdodCkgfHwgY2VsbE1ldGFkYXR1bS53aWR0aCA9PSBudWxsIHx8IGlzTmFOKGNlbGxNZXRhZGF0dW0ud2lkdGgpIHx8IGNlbGxNZXRhZGF0dW0ueCA9PSBudWxsIHx8IGlzTmFOKGNlbGxNZXRhZGF0dW0ueCkgfHwgY2VsbE1ldGFkYXR1bS55ID09IG51bGwgfHwgaXNOYU4oY2VsbE1ldGFkYXR1bS55KSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgbWV0YWRhdGEgcmV0dXJuZWQgZm9yIGNlbGwgJyArIGluZGV4ICsgJzpcXG4gICAgICAgIHg6JyArIGNlbGxNZXRhZGF0dW0ueCArICcsIHk6JyArIGNlbGxNZXRhZGF0dW0ueSArICcsIHdpZHRoOicgKyBjZWxsTWV0YWRhdHVtLndpZHRoICsgJywgaGVpZ2h0OicgKyBjZWxsTWV0YWRhdHVtLmhlaWdodCk7XG4gICAgfVxuXG4gICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCBjZWxsTWV0YWRhdHVtLnkgKyBjZWxsTWV0YWRhdHVtLmhlaWdodCk7XG4gICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgY2VsbE1ldGFkYXR1bS54ICsgY2VsbE1ldGFkYXR1bS53aWR0aCk7XG5cbiAgICBjZWxsTWV0YWRhdGFbaW5kZXhdID0gY2VsbE1ldGFkYXR1bTtcbiAgICBzZWN0aW9uTWFuYWdlci5yZWdpc3RlckNlbGwoe1xuICAgICAgY2VsbE1ldGFkYXR1bTogY2VsbE1ldGFkYXR1bSxcbiAgICAgIGluZGV4OiBpbmRleFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjZWxsTWV0YWRhdGE6IGNlbGxNZXRhZGF0YSxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBzZWN0aW9uTWFuYWdlcjogc2VjdGlvbk1hbmFnZXIsXG4gICAgd2lkdGg6IHdpZHRoXG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSGlnaC1vcmRlciBjb21wb25lbnQgdGhhdCBhdXRvLWNhbGN1bGF0ZXMgY29sdW1uLXdpZHRocyBmb3IgYEdyaWRgIGNlbGxzLlxuICovXG52YXIgQ29sdW1uU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sdW1uU2l6ZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbHVtblNpemVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbHVtblNpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChDb2x1bW5TaXplci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbHVtblNpemVyKSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX3JlZ2lzdGVyQ2hpbGQgPSBfdGhpcy5fcmVnaXN0ZXJDaGlsZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ29sdW1uU2l6ZXIsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5NYXhXaWR0aCA9IF9wcm9wcy5jb2x1bW5NYXhXaWR0aDtcbiAgICAgIHZhciBjb2x1bW5NaW5XaWR0aCA9IF9wcm9wcy5jb2x1bW5NaW5XaWR0aDtcbiAgICAgIHZhciBjb2x1bW5Db3VudCA9IF9wcm9wcy5jb2x1bW5Db3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcblxuXG4gICAgICBpZiAoY29sdW1uTWF4V2lkdGggIT09IHByZXZQcm9wcy5jb2x1bW5NYXhXaWR0aCB8fCBjb2x1bW5NaW5XaWR0aCAhPT0gcHJldlByb3BzLmNvbHVtbk1pbldpZHRoIHx8IGNvbHVtbkNvdW50ICE9PSBwcmV2UHJvcHMuY29sdW1uQ291bnQgfHwgd2lkdGggIT09IHByZXZQcm9wcy53aWR0aCkge1xuICAgICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuO1xuICAgICAgdmFyIGNvbHVtbk1heFdpZHRoID0gX3Byb3BzMi5jb2x1bW5NYXhXaWR0aDtcbiAgICAgIHZhciBjb2x1bW5NaW5XaWR0aCA9IF9wcm9wczIuY29sdW1uTWluV2lkdGg7XG4gICAgICB2YXIgY29sdW1uQ291bnQgPSBfcHJvcHMyLmNvbHVtbkNvdW50O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMi53aWR0aDtcblxuXG4gICAgICB2YXIgc2FmZUNvbHVtbk1pbldpZHRoID0gY29sdW1uTWluV2lkdGggfHwgMTtcblxuICAgICAgdmFyIHNhZmVDb2x1bW5NYXhXaWR0aCA9IGNvbHVtbk1heFdpZHRoID8gTWF0aC5taW4oY29sdW1uTWF4V2lkdGgsIHdpZHRoKSA6IHdpZHRoO1xuXG4gICAgICB2YXIgY29sdW1uV2lkdGggPSB3aWR0aCAvIGNvbHVtbkNvdW50O1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLm1heChzYWZlQ29sdW1uTWluV2lkdGgsIGNvbHVtbldpZHRoKTtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5taW4oc2FmZUNvbHVtbk1heFdpZHRoLCBjb2x1bW5XaWR0aCk7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGguZmxvb3IoY29sdW1uV2lkdGgpO1xuXG4gICAgICB2YXIgYWRqdXN0ZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoLCBjb2x1bW5XaWR0aCAqIGNvbHVtbkNvdW50KTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgYWRqdXN0ZWRXaWR0aDogYWRqdXN0ZWRXaWR0aCxcbiAgICAgICAgZ2V0Q29sdW1uV2lkdGg6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKCkge1xuICAgICAgICAgIHJldHVybiBjb2x1bW5XaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJDaGlsZDogdGhpcy5fcmVnaXN0ZXJDaGlsZFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkICE9PSBudWxsICYmICEoY2hpbGQgaW5zdGFuY2VvZiBfR3JpZDIuZGVmYXVsdCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgY2hpbGQgdHlwZSByZWdpc3RlcmVkOyBvbmx5IEdyaWQgY2hpbGRyZW4gYXJlIHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkID0gY2hpbGQ7XG5cbiAgICAgIGlmICh0aGlzLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbHVtblNpemVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uU2l6ZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBhIHZpcnR1YWxpemVkIEdyaWQuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgYWRqdXN0ZWRXaWR0aCwgZ2V0Q29sdW1uV2lkdGgsIHJlZ2lzdGVyQ2hpbGQgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICpcbiAgICogVGhlIHNwZWNpZmllZCA6Z2V0Q29sdW1uV2lkdGggZnVuY3Rpb24gc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgR3JpZCdzIDpjb2x1bW5XaWR0aCBwcm9wZXJ0eS5cbiAgICogVGhlIDpyZWdpc3RlckNoaWxkIHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIEdyaWQncyA6cmVmIHByb3BlcnR5LlxuICAgKiBUaGUgOmFkanVzdGVkV2lkdGggcHJvcGVydHkgaXMgb3B0aW9uYWw7IGl0IHJlZmxlY3RzIHRoZSBsZXNzZXIgb2YgdGhlIG92ZXJhbGwgd2lkdGggb3IgdGhlIHdpZHRoIG9mIGFsbCBjb2x1bW5zLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCBtYXhpbXVtIGFsbG93ZWQgY29sdW1uIHdpZHRoICovXG4gIGNvbHVtbk1heFdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgbWluaW11bSBhbGxvd2VkIGNvbHVtbiB3aWR0aCAqL1xuICBjb2x1bW5NaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE51bWJlciBvZiBjb2x1bW5zIGluIEdyaWQgb3IgRmxleFRhYmxlIGNoaWxkICovXG4gIGNvbHVtbkNvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBXaWR0aCBvZiBHcmlkIG9yIEZsZXhUYWJsZSBjaGlsZCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbHVtblNpemVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ29sdW1uU2l6ZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQ29sdW1uU2l6ZXIyID0gcmVxdWlyZSgnLi9Db2x1bW5TaXplcicpO1xuXG52YXIgX0NvbHVtblNpemVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbHVtblNpemVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Db2x1bW5TaXplcjMuZGVmYXVsdDtcbmV4cG9ydHMuQ29sdW1uU2l6ZXIgPSBfQ29sdW1uU2l6ZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9kZWZhdWx0SGVhZGVyUmVuZGVyZXIgPSByZXF1aXJlKCcuL2RlZmF1bHRIZWFkZXJSZW5kZXJlcicpO1xuXG52YXIgX2RlZmF1bHRIZWFkZXJSZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0SGVhZGVyUmVuZGVyZXIpO1xuXG52YXIgX2RlZmF1bHRDZWxsUmVuZGVyZXIgPSByZXF1aXJlKCcuL2RlZmF1bHRDZWxsUmVuZGVyZXInKTtcblxudmFyIF9kZWZhdWx0Q2VsbFJlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDZWxsUmVuZGVyZXIpO1xuXG52YXIgX2RlZmF1bHRDZWxsRGF0YUdldHRlciA9IHJlcXVpcmUoJy4vZGVmYXVsdENlbGxEYXRhR2V0dGVyJyk7XG5cbnZhciBfZGVmYXVsdENlbGxEYXRhR2V0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDZWxsRGF0YUdldHRlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGhlYWRlciBhbmQgY2VsbCBjb250ZW50cyBvZiBhIHRhYmxlIGNvbHVtbi5cbiAqL1xudmFyIENvbHVtbiA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhDb2x1bW4sIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbHVtbigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sdW1uKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ29sdW1uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sdW1uKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gQ29sdW1uO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2VsbERhdGFHZXR0ZXI6IF9kZWZhdWx0Q2VsbERhdGFHZXR0ZXIyLmRlZmF1bHQsXG4gIGNlbGxSZW5kZXJlcjogX2RlZmF1bHRDZWxsUmVuZGVyZXIyLmRlZmF1bHQsXG4gIGZsZXhHcm93OiAwLFxuICBmbGV4U2hyaW5rOiAxLFxuICBoZWFkZXJSZW5kZXJlcjogX2RlZmF1bHRIZWFkZXJSZW5kZXJlcjIuZGVmYXVsdCxcbiAgc3R5bGU6IHt9XG59O1xuQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgLyoqIE9wdGlvbmFsIGFyaWEtbGFiZWwgdmFsdWUgdG8gc2V0IG9uIHRoZSBjb2x1bW4gaGVhZGVyICovXG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgYSBjZWxsJ3MgZGF0YSwgZ2l2ZW4gaXRzIDpkYXRhS2V5XG4gICAqICh7IGNvbHVtbkRhdGE6IGFueSwgZGF0YUtleTogc3RyaW5nLCByb3dEYXRhOiBhbnkgfSk6IGFueVxuICAgKi9cbiAgY2VsbERhdGFHZXR0ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwncyBjb250ZW50cy5cbiAgICogKHsgY2VsbERhdGE6IGFueSwgY29sdW1uRGF0YTogYW55LCBkYXRhS2V5OiBzdHJpbmcsIHJvd0RhdGE6IGFueSwgcm93SW5kZXg6IG51bWJlciB9KTogbm9kZVxuICAgKi9cbiAgY2VsbFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBjZWxsICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIE9wdGlvbmFsIGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgdG8gdGhpcyBjb2x1bW4ncyA6Y2VsbERhdGFHZXR0ZXIgKi9cbiAgY29sdW1uRGF0YTogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqIFVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHJvdy1kYXRhIGF0dHJpYnV0ZSBjb3JyZXNwbmRpbmcgdG8gdGhpcyBjZWxsICovXG4gIGRhdGFLZXk6IF9yZWFjdC5Qcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG5cbiAgLyoqIElmIHNvcnQgaXMgZW5hYmxlZCBmb3IgdGhlIHRhYmxlIGF0IGxhcmdlLCBkaXNhYmxlIGl0IGZvciB0aGlzIGNvbHVtbiAqL1xuICBkaXNhYmxlU29ydDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBGbGV4IGdyb3cgc3R5bGU7IGRlZmF1bHRzIHRvIDAgKi9cbiAgZmxleEdyb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBGbGV4IHNocmluayBzdHlsZTsgZGVmYXVsdHMgdG8gMSAqL1xuICBmbGV4U2hyaW5rOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIHRoaXMgY29sdW1uJ3MgaGVhZGVyICovXG4gIGhlYWRlckNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGNhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjb2x1bW4gaGVhZGVyIGNvbnRlbnRzLlxuICAgKiAoeyBjb2x1bW5EYXRhOiBvYmplY3QsIGRhdGFLZXk6IHN0cmluZywgZGlzYWJsZVNvcnQ6IGJvb2xlYW4sIGxhYmVsOiBzdHJpbmcsIHNvcnRCeTogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOiBzdHJpbmcgfSk6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICBoZWFkZXJSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEhlYWRlciBsYWJlbCBmb3IgdGhpcyBjb2x1bW4gKi9cbiAgbGFiZWw6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBNYXhpbXVtIHdpZHRoIG9mIGNvbHVtbjsgdGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgYmUgdXNlZCBpZiA6ZmxleEdyb3cgaXMgPiAwLiAqL1xuICBtYXhXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE1pbmltdW0gd2lkdGggb2YgY29sdW1uLiAqL1xuICBtaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE9wdGlvbmFsIGlubGluZSBzdHlsZSB0byBhcHBseSB0byBjZWxsICovXG4gIHN0eWxlOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKiogRmxleCBiYXNpcyAod2lkdGgpIGZvciB0aGlzIGNvbHVtbjsgVGhpcyB2YWx1ZSBjYW4gZ3JvdyBvciBzaHJpbmsgYmFzZWQgb24gOmZsZXhHcm93IGFuZCA6ZmxleFNocmluayBwcm9wZXJ0aWVzLiAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbHVtbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX0ZsZXhDb2x1bW4gPSByZXF1aXJlKCcuL0ZsZXhDb2x1bW4nKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhDb2x1bW4pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX2RlZmF1bHRSb3dSZW5kZXJlciA9IHJlcXVpcmUoJy4vZGVmYXVsdFJvd1JlbmRlcmVyJyk7XG5cbnZhciBfZGVmYXVsdFJvd1JlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRSb3dSZW5kZXJlcik7XG5cbnZhciBfU29ydERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBUYWJsZSBjb21wb25lbnQgd2l0aCBmaXhlZCBoZWFkZXJzIGFuZCB2aXJ0dWFsaXplZCByb3dzIGZvciBpbXByb3ZlZCBwZXJmb3JtYW5jZSB3aXRoIGxhcmdlIGRhdGEgc2V0cy5cbiAqIFRoaXMgY29tcG9uZW50IGV4cGVjdHMgZXhwbGljaXQgd2lkdGgsIGhlaWdodCwgYW5kIHBhZGRpbmcgcGFyYW1ldGVycy5cbiAqL1xudmFyIEZsZXhUYWJsZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhGbGV4VGFibGUsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEZsZXhUYWJsZShwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGV4VGFibGUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEZsZXhUYWJsZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZsZXhUYWJsZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgc2Nyb2xsYmFyV2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NlbGxDbGFzc05hbWUgPSBfdGhpcy5fY2VsbENsYXNzTmFtZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY2VsbFN0eWxlID0gX3RoaXMuX2NlbGxTdHlsZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY3JlYXRlQ29sdW1uID0gX3RoaXMuX2NyZWF0ZUNvbHVtbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY3JlYXRlUm93ID0gX3RoaXMuX2NyZWF0ZVJvdy5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2VjdGlvblJlbmRlcmVkID0gX3RoaXMuX29uU2VjdGlvblJlbmRlcmVkLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhGbGV4VGFibGUsIFt7XG4gICAga2V5OiAnZm9yY2VVcGRhdGVHcmlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGVHcmlkKCkge1xuICAgICAgdGhpcy5HcmlkLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFNlZSBHcmlkI21lYXN1cmVBbGxDZWxscyAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtZWFzdXJlQWxsUm93cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1lYXN1cmVBbGxSb3dzKCkge1xuICAgICAgdGhpcy5HcmlkLm1lYXN1cmVBbGxDZWxscygpO1xuICAgIH1cblxuICAgIC8qKiBTZWUgR3JpZCNyZWNvbXB1dGVHcmlkU2l6ZSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZWNvbXB1dGVSb3dIZWlnaHRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlUm93SGVpZ2h0cygpIHtcbiAgICAgIHZhciBpbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDAgOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIHRoaXMuR3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSh7XG4gICAgICAgIHJvd0luZGV4OiBpbmRleFxuICAgICAgfSk7XG4gICAgICB0aGlzLmZvcmNlVXBkYXRlR3JpZCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLl9zZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgZGlzYWJsZUhlYWRlciA9IF9wcm9wcy5kaXNhYmxlSGVhZGVyO1xuICAgICAgdmFyIGdyaWRDbGFzc05hbWUgPSBfcHJvcHMuZ3JpZENsYXNzTmFtZTtcbiAgICAgIHZhciBncmlkU3R5bGUgPSBfcHJvcHMuZ3JpZFN0eWxlO1xuICAgICAgdmFyIGhlYWRlckhlaWdodCA9IF9wcm9wcy5oZWFkZXJIZWlnaHQ7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzLmhlaWdodDtcbiAgICAgIHZhciBub1Jvd3NSZW5kZXJlciA9IF9wcm9wcy5ub1Jvd3NSZW5kZXJlcjtcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSBfcHJvcHMucm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd1N0eWxlID0gX3Byb3BzLnJvd1N0eWxlO1xuICAgICAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcHJvcHMuc2Nyb2xsVG9JbmRleDtcbiAgICAgIHZhciBzdHlsZSA9IF9wcm9wcy5zdHlsZTtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuc3RhdGUuc2Nyb2xsYmFyV2lkdGg7XG5cblxuICAgICAgdmFyIGF2YWlsYWJsZVJvd3NIZWlnaHQgPSBoZWlnaHQgLSBoZWFkZXJIZWlnaHQ7XG5cbiAgICAgIHZhciByb3dDbGFzcyA9IHJvd0NsYXNzTmFtZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93Q2xhc3NOYW1lKHsgaW5kZXg6IC0xIH0pIDogcm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd1N0eWxlT2JqZWN0ID0gcm93U3R5bGUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd1N0eWxlKHsgaW5kZXg6IC0xIH0pIDogcm93U3R5bGU7XG5cbiAgICAgIC8vIFByZWNvbXB1dGUgYW5kIGNhY2hlIGNvbHVtbiBzdHlsZXMgYmVmb3JlIHJlbmRlcmluZyByb3dzIGFuZCBjb2x1bW5zIHRvIHNwZWVkIHRoaW5ncyB1cFxuICAgICAgdGhpcy5fY2FjaGVkQ29sdW1uU3R5bGVzID0gW107XG4gICAgICBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xuICAgICAgICBfdGhpczIuX2NhY2hlZENvbHVtblN0eWxlc1tpbmRleF0gPSBfdGhpczIuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4sIGNvbHVtbi5wcm9wcy5zdHlsZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gTm90ZSB0aGF0IHdlIHNwZWNpZnkgOm51bUNoaWxkcmVuLCA6c2Nyb2xsYmFyV2lkdGgsIDpzb3J0QnksIGFuZCA6c29ydERpcmVjdGlvbiBhcyBwcm9wZXJ0aWVzIG9uIEdyaWQgZXZlbiB0aG91Z2ggdGhlc2UgaGF2ZSBub3RoaW5nIHRvIGRvIHdpdGggR3JpZC5cbiAgICAgIC8vIFRoaXMgaXMgZG9uZSBiZWNhdXNlIEdyaWQgaXMgYSBwdXJlIGNvbXBvbmVudCBhbmQgd29uJ3QgdXBkYXRlIHVubGVzcyBpdHMgcHJvcGVydGllcyBvciBzdGF0ZSBoYXMgY2hhbmdlZC5cbiAgICAgIC8vIEFueSBwcm9wZXJ0eSB0aGF0IHNob3VsZCB0cmlnZ2VyIGEgcmUtcmVuZGVyIG9mIEdyaWQgdGhlbiBpcyBzcGVjaWZpZWQgaGVyZSB0byBhdm9pZCBhIHN0YWxlIGRpc3BsYXkuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGUnLCBjbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgICB9LFxuICAgICAgICAhZGlzYWJsZUhlYWRlciAmJiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9faGVhZGVyUm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgICAgc3R5bGU6IF9leHRlbmRzKHt9LCByb3dTdHlsZU9iamVjdCwge1xuICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodCxcbiAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBzY3JvbGxiYXJXaWR0aCxcbiAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5fZ2V0UmVuZGVyZWRIZWFkZXJSb3coKVxuICAgICAgICApLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgICBhdXRvQ29udGFpbmVyV2lkdGg6IHRydWUsXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX0dyaWQnLCBncmlkQ2xhc3NOYW1lKSxcbiAgICAgICAgICBjZWxsQ2xhc3NOYW1lOiB0aGlzLl9jZWxsQ2xhc3NOYW1lLFxuICAgICAgICAgIGNlbGxSZW5kZXJlcjogdGhpcy5fY3JlYXRlUm93LFxuICAgICAgICAgIGNlbGxTdHlsZTogdGhpcy5fY2VsbFN0eWxlLFxuICAgICAgICAgIGNvbHVtbldpZHRoOiB3aWR0aCxcbiAgICAgICAgICBjb2x1bW5Db3VudDogMSxcbiAgICAgICAgICBoZWlnaHQ6IGF2YWlsYWJsZVJvd3NIZWlnaHQsXG4gICAgICAgICAgbm9Db250ZW50UmVuZGVyZXI6IG5vUm93c1JlbmRlcmVyLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQsXG4gICAgICAgICAgcmVmOiBmdW5jdGlvbiByZWYoX3JlZikge1xuICAgICAgICAgICAgX3RoaXMyLkdyaWQgPSBfcmVmO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IHNjcm9sbGJhcldpZHRoLFxuICAgICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb0luZGV4LFxuICAgICAgICAgIHN0eWxlOiBncmlkU3R5bGVcbiAgICAgICAgfSkpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jZWxsQ2xhc3NOYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NlbGxDbGFzc05hbWUoX3JlZjIpIHtcbiAgICAgIHZhciByb3dJbmRleCA9IF9yZWYyLnJvd0luZGV4O1xuICAgICAgdmFyIHJvd1dyYXBwZXJDbGFzc05hbWUgPSB0aGlzLnByb3BzLnJvd1dyYXBwZXJDbGFzc05hbWU7XG5cblxuICAgICAgcmV0dXJuIHJvd1dyYXBwZXJDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd1dyYXBwZXJDbGFzc05hbWUoeyBpbmRleDogcm93SW5kZXggLSAxIH0pIDogcm93V3JhcHBlckNsYXNzTmFtZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2VsbFN0eWxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NlbGxTdHlsZShfcmVmMykge1xuICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjMucm93SW5kZXg7XG4gICAgICB2YXIgcm93V3JhcHBlclN0eWxlID0gdGhpcy5wcm9wcy5yb3dXcmFwcGVyU3R5bGU7XG5cblxuICAgICAgcmV0dXJuIHJvd1dyYXBwZXJTdHlsZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93V3JhcHBlclN0eWxlKHsgaW5kZXg6IHJvd0luZGV4IC0gMSB9KSA6IHJvd1dyYXBwZXJTdHlsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlQ29sdW1uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZUNvbHVtbihfcmVmNCkge1xuICAgICAgdmFyIGNvbHVtbiA9IF9yZWY0LmNvbHVtbjtcbiAgICAgIHZhciBjb2x1bW5JbmRleCA9IF9yZWY0LmNvbHVtbkluZGV4O1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3JlZjQuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgcm93RGF0YSA9IF9yZWY0LnJvd0RhdGE7XG4gICAgICB2YXIgcm93SW5kZXggPSBfcmVmNC5yb3dJbmRleDtcbiAgICAgIHZhciBfY29sdW1uJHByb3BzID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGNlbGxEYXRhR2V0dGVyID0gX2NvbHVtbiRwcm9wcy5jZWxsRGF0YUdldHRlcjtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzLmNlbGxSZW5kZXJlcjtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfY29sdW1uJHByb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBjb2x1bW5EYXRhID0gX2NvbHVtbiRwcm9wcy5jb2x1bW5EYXRhO1xuICAgICAgdmFyIGRhdGFLZXkgPSBfY29sdW1uJHByb3BzLmRhdGFLZXk7XG5cblxuICAgICAgdmFyIGNlbGxEYXRhID0gY2VsbERhdGFHZXR0ZXIoeyBjb2x1bW5EYXRhOiBjb2x1bW5EYXRhLCBkYXRhS2V5OiBkYXRhS2V5LCByb3dEYXRhOiByb3dEYXRhIH0pO1xuICAgICAgdmFyIHJlbmRlcmVkQ2VsbCA9IGNlbGxSZW5kZXJlcih7IGNlbGxEYXRhOiBjZWxsRGF0YSwgY29sdW1uRGF0YTogY29sdW1uRGF0YSwgZGF0YUtleTogZGF0YUtleSwgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nLCByb3dEYXRhOiByb3dEYXRhLCByb3dJbmRleDogcm93SW5kZXggfSk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2NhY2hlZENvbHVtblN0eWxlc1tjb2x1bW5JbmRleF07XG5cbiAgICAgIHZhciB0aXRsZSA9IHR5cGVvZiByZW5kZXJlZENlbGwgPT09ICdzdHJpbmcnID8gcmVuZGVyZWRDZWxsIDogbnVsbDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ1JvdycgKyByb3dJbmRleCArICctQ29sJyArIGNvbHVtbkluZGV4LFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19yb3dDb2x1bW4nLCBjbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyZWRDZWxsXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVIZWFkZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlSGVhZGVyKF9yZWY1KSB7XG4gICAgICB2YXIgY29sdW1uID0gX3JlZjUuY29sdW1uO1xuICAgICAgdmFyIGluZGV4ID0gX3JlZjUuaW5kZXg7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVhZGVyQ2xhc3NOYW1lID0gX3Byb3BzMi5oZWFkZXJDbGFzc05hbWU7XG4gICAgICB2YXIgaGVhZGVyU3R5bGUgPSBfcHJvcHMyLmhlYWRlclN0eWxlO1xuICAgICAgdmFyIG9uSGVhZGVyQ2xpY2sgPSBfcHJvcHMyLm9uSGVhZGVyQ2xpY2s7XG4gICAgICB2YXIgc29ydCA9IF9wcm9wczIuc29ydDtcbiAgICAgIHZhciBzb3J0QnkgPSBfcHJvcHMyLnNvcnRCeTtcbiAgICAgIHZhciBzb3J0RGlyZWN0aW9uID0gX3Byb3BzMi5zb3J0RGlyZWN0aW9uO1xuICAgICAgdmFyIF9jb2x1bW4kcHJvcHMyID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGRhdGFLZXkgPSBfY29sdW1uJHByb3BzMi5kYXRhS2V5O1xuICAgICAgdmFyIGRpc2FibGVTb3J0ID0gX2NvbHVtbiRwcm9wczIuZGlzYWJsZVNvcnQ7XG4gICAgICB2YXIgaGVhZGVyUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzMi5oZWFkZXJSZW5kZXJlcjtcbiAgICAgIHZhciBsYWJlbCA9IF9jb2x1bW4kcHJvcHMyLmxhYmVsO1xuICAgICAgdmFyIGNvbHVtbkRhdGEgPSBfY29sdW1uJHByb3BzMi5jb2x1bW5EYXRhO1xuXG4gICAgICB2YXIgc29ydEVuYWJsZWQgPSAhZGlzYWJsZVNvcnQgJiYgc29ydDtcblxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX2hlYWRlckNvbHVtbicsIGhlYWRlckNsYXNzTmFtZSwgY29sdW1uLnByb3BzLmhlYWRlckNsYXNzTmFtZSwge1xuICAgICAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckNvbHVtbic6IHNvcnRFbmFibGVkXG4gICAgICB9KTtcbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4sIGhlYWRlclN0eWxlKTtcblxuICAgICAgdmFyIHJlbmRlcmVkSGVhZGVyID0gaGVhZGVyUmVuZGVyZXIoe1xuICAgICAgICBjb2x1bW5EYXRhOiBjb2x1bW5EYXRhLFxuICAgICAgICBkYXRhS2V5OiBkYXRhS2V5LFxuICAgICAgICBkaXNhYmxlU29ydDogZGlzYWJsZVNvcnQsXG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHNvcnREaXJlY3Rpb246IHNvcnREaXJlY3Rpb25cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYTExeVByb3BzID0ge307XG5cbiAgICAgIGlmIChzb3J0RW5hYmxlZCB8fCBvbkhlYWRlckNsaWNrKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHNvcnRhYmxlIGhlYWRlciwgY2xpY2tpbmcgaXQgc2hvdWxkIHVwZGF0ZSB0aGUgdGFibGUgZGF0YSdzIHNvcnRpbmcuXG4gICAgICAgICAgdmFyIG5ld1NvcnREaXJlY3Rpb24gPSBzb3J0QnkgIT09IGRhdGFLZXkgfHwgc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQyA/IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQyA6IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0M7XG5cbiAgICAgICAgICB2YXIgb25DbGljayA9IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICBzb3J0RW5hYmxlZCAmJiBzb3J0KHtcbiAgICAgICAgICAgICAgc29ydEJ5OiBkYXRhS2V5LFxuICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uOiBuZXdTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uSGVhZGVyQ2xpY2sgJiYgb25IZWFkZXJDbGljayh7IGNvbHVtbkRhdGE6IGNvbHVtbkRhdGEsIGRhdGFLZXk6IGRhdGFLZXkgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBvbktleURvd24gPSBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgICAgb25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBhMTF5UHJvcHNbJ2FyaWEtbGFiZWwnXSA9IGNvbHVtbi5wcm9wc1snYXJpYS1sYWJlbCddIHx8IGxhYmVsIHx8IGRhdGFLZXk7XG4gICAgICAgICAgYTExeVByb3BzLnJvbGUgPSAncm93aGVhZGVyJztcbiAgICAgICAgICBhMTF5UHJvcHMudGFiSW5kZXggPSAwO1xuICAgICAgICAgIGExMXlQcm9wcy5vbkNsaWNrID0gb25DbGljaztcbiAgICAgICAgICBhMTF5UHJvcHMub25LZXlEb3duID0gb25LZXlEb3duO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgYTExeVByb3BzLCB7XG4gICAgICAgICAga2V5OiAnSGVhZGVyLUNvbCcgKyBpbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICAgIH0pLFxuICAgICAgICByZW5kZXJlZEhlYWRlclxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlUm93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZVJvdyhfcmVmNikge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBpbmRleCA9IF9yZWY2LnJvd0luZGV4O1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3JlZjYuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuO1xuICAgICAgdmFyIG9uUm93Q2xpY2sgPSBfcHJvcHMzLm9uUm93Q2xpY2s7XG4gICAgICB2YXIgb25Sb3dEb3VibGVDbGljayA9IF9wcm9wczMub25Sb3dEb3VibGVDbGljaztcbiAgICAgIHZhciBvblJvd01vdXNlT3ZlciA9IF9wcm9wczMub25Sb3dNb3VzZU92ZXI7XG4gICAgICB2YXIgb25Sb3dNb3VzZU91dCA9IF9wcm9wczMub25Sb3dNb3VzZU91dDtcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSBfcHJvcHMzLnJvd0NsYXNzTmFtZTtcbiAgICAgIHZhciByb3dHZXR0ZXIgPSBfcHJvcHMzLnJvd0dldHRlcjtcbiAgICAgIHZhciByb3dSZW5kZXJlciA9IF9wcm9wczMucm93UmVuZGVyZXI7XG4gICAgICB2YXIgcm93U3R5bGUgPSBfcHJvcHMzLnJvd1N0eWxlO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcblxuXG4gICAgICB2YXIgcm93Q2xhc3MgPSByb3dDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0NsYXNzTmFtZSh7IGluZGV4OiBpbmRleCB9KSA6IHJvd0NsYXNzTmFtZTtcbiAgICAgIHZhciByb3dTdHlsZU9iamVjdCA9IHJvd1N0eWxlIGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dTdHlsZSh7IGluZGV4OiBpbmRleCB9KSA6IHJvd1N0eWxlO1xuICAgICAgdmFyIHJvd0RhdGEgPSByb3dHZXR0ZXIoeyBpbmRleDogaW5kZXggfSk7XG5cbiAgICAgIHZhciBjb2x1bW5zID0gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5JbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLl9jcmVhdGVDb2x1bW4oe1xuICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCxcbiAgICAgICAgICBpc1Njcm9sbGluZzogaXNTY3JvbGxpbmcsXG4gICAgICAgICAgcm93RGF0YTogcm93RGF0YSxcbiAgICAgICAgICByb3dJbmRleDogaW5kZXgsXG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGg6IHNjcm9sbGJhcldpZHRoXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3JvdycsIHJvd0NsYXNzKTtcbiAgICAgIHZhciBzdHlsZSA9IF9leHRlbmRzKHt9LCByb3dTdHlsZU9iamVjdCwge1xuICAgICAgICBoZWlnaHQ6IHRoaXMuX2dldFJvd0hlaWdodChpbmRleCksXG4gICAgICAgIHBhZGRpbmdSaWdodDogc2Nyb2xsYmFyV2lkdGhcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcm93UmVuZGVyZXIoe1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgY29sdW1uczogY29sdW1ucyxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBpc1Njcm9sbGluZzogaXNTY3JvbGxpbmcsXG4gICAgICAgIG9uUm93Q2xpY2s6IG9uUm93Q2xpY2ssXG4gICAgICAgIG9uUm93RG91YmxlQ2xpY2s6IG9uUm93RG91YmxlQ2xpY2ssXG4gICAgICAgIG9uUm93TW91c2VPdmVyOiBvblJvd01vdXNlT3ZlcixcbiAgICAgICAgb25Sb3dNb3VzZU91dDogb25Sb3dNb3VzZU91dCxcbiAgICAgICAgcm93RGF0YTogcm93RGF0YSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBmbGV4LXNocmluaywgZmxleC1ncm93LCBhbmQgd2lkdGggdmFsdWVzIGZvciBhIGNlbGwgKGhlYWRlciBvciBjb2x1bW4pLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0RmxleFN0eWxlRm9yQ29sdW1uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4pIHtcbiAgICAgIHZhciBjdXN0b21TdHlsZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgZmxleFZhbHVlID0gY29sdW1uLnByb3BzLmZsZXhHcm93ICsgJyAnICsgY29sdW1uLnByb3BzLmZsZXhTaHJpbmsgKyAnICcgKyBjb2x1bW4ucHJvcHMud2lkdGggKyAncHgnO1xuXG4gICAgICB2YXIgc3R5bGUgPSBfZXh0ZW5kcyh7fSwgY3VzdG9tU3R5bGUsIHtcbiAgICAgICAgZmxleDogZmxleFZhbHVlLFxuICAgICAgICBtc0ZsZXg6IGZsZXhWYWx1ZSxcbiAgICAgICAgV2Via2l0RmxleDogZmxleFZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5tYXhXaWR0aCkge1xuICAgICAgICBzdHlsZS5tYXhXaWR0aCA9IGNvbHVtbi5wcm9wcy5tYXhXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5taW5XaWR0aCkge1xuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGNvbHVtbi5wcm9wcy5taW5XaWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRSZW5kZXJlZEhlYWRlclJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSZW5kZXJlZEhlYWRlclJvdygpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHM0LmNoaWxkcmVuO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHM0LmRpc2FibGVIZWFkZXI7XG5cbiAgICAgIHZhciBpdGVtcyA9IGRpc2FibGVIZWFkZXIgPyBbXSA6IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcblxuICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXM0Ll9jcmVhdGVIZWFkZXIoeyBjb2x1bW46IGNvbHVtbiwgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFJvd0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSb3dIZWlnaHQocm93SW5kZXgpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSB0aGlzLnByb3BzLnJvd0hlaWdodDtcblxuXG4gICAgICByZXR1cm4gcm93SGVpZ2h0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dIZWlnaHQoeyBpbmRleDogcm93SW5kZXggfSkgOiByb3dIZWlnaHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKF9yZWY3KSB7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZjcuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWY3LnNjcm9sbEhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmNy5zY3JvbGxUb3A7XG4gICAgICB2YXIgb25TY3JvbGwgPSB0aGlzLnByb3BzLm9uU2Nyb2xsO1xuXG5cbiAgICAgIG9uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TZWN0aW9uUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TZWN0aW9uUmVuZGVyZWQoX3JlZjgpIHtcbiAgICAgIHZhciByb3dPdmVyc2NhblN0YXJ0SW5kZXggPSBfcmVmOC5yb3dPdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmOC5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjgucm93U3RhcnRJbmRleDtcbiAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmOC5yb3dTdG9wSW5kZXg7XG4gICAgICB2YXIgb25Sb3dzUmVuZGVyZWQgPSB0aGlzLnByb3BzLm9uUm93c1JlbmRlcmVkO1xuXG5cbiAgICAgIG9uUm93c1JlbmRlcmVkKHtcbiAgICAgICAgb3ZlcnNjYW5TdGFydEluZGV4OiByb3dPdmVyc2NhblN0YXJ0SW5kZXgsXG4gICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiByb3dPdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgc3RhcnRJbmRleDogcm93U3RhcnRJbmRleCxcbiAgICAgICAgc3RvcEluZGV4OiByb3dTdG9wSW5kZXhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxiYXJXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgIHZhciBHcmlkID0gKDAsIF9yZWFjdERvbS5maW5kRE9NTm9kZSkodGhpcy5HcmlkKTtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IEdyaWQuY2xpZW50V2lkdGggfHwgMDtcbiAgICAgIHZhciBvZmZzZXRXaWR0aCA9IEdyaWQub2Zmc2V0V2lkdGggfHwgMDtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IG9mZnNldFdpZHRoIC0gY2xpZW50V2lkdGg7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBzY3JvbGxiYXJXaWR0aDogc2Nyb2xsYmFyV2lkdGggfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZsZXhUYWJsZTtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkZsZXhUYWJsZS5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZml4ZWQgaGVpZ2h0IGZyb20gdGhlIHNjcm9sbGluZ0NvbnRhaW5lciBzbyB0aGF0IHRoZSB0b3RhbCBoZWlnaHRcbiAgICogb2Ygcm93cyBjYW4gc3RyZXRjaCB0aGUgd2luZG93LiBJbnRlbmRlZCBmb3IgdXNlIHdpdGggV2luZG93U2Nyb2xsZXJcbiAgICovXG4gIGF1dG9IZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogT25lIG9yIG1vcmUgRmxleENvbHVtbnMgZGVzY3JpYmluZyB0aGUgZGF0YSBkaXNwbGF5ZWQgaW4gdGhpcyByb3cgKi9cbiAgY2hpbGRyZW46IGZ1bmN0aW9uIGNoaWxkcmVuKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KHByb3BzLmNoaWxkcmVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hpbGRyZW5baV0udHlwZSAhPT0gX0ZsZXhDb2x1bW4yLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRmxleFRhYmxlIG9ubHkgYWNjZXB0cyBjaGlsZHJlbiBvZiB0eXBlIEZsZXhDb2x1bW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyBuYW1lICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIERpc2FibGUgcmVuZGVyaW5nIHRoZSBoZWFkZXIgYXQgYWxsICovXG4gIGRpc2FibGVIZWFkZXI6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogVXNlZCB0byBlc3RpbWF0ZSB0aGUgdG90YWwgaGVpZ2h0IG9mIGEgRmxleFRhYmxlIGJlZm9yZSBhbGwgb2YgaXRzIHJvd3MgaGF2ZSBhY3R1YWxseSBiZWVuIG1lYXN1cmVkLlxuICAgKiBUaGUgZXN0aW1hdGVkIHRvdGFsIGhlaWdodCBpcyBhZGp1c3RlZCBhcyByb3dzIGFyZSByZW5kZXJlZC5cbiAgICovXG4gIGVzdGltYXRlZFJvd1NpemU6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgbmFtZSB0byBhdHRhY2ggdG8gaW5uZXIgR3JpZCBlbGVtZW50LiAqL1xuICBncmlkQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogT3B0aW9uYWwgaW5saW5lIHN0eWxlIHRvIGF0dGFjaCB0byBpbm5lciBHcmlkIGVsZW1lbnQuICovXG4gIGdyaWRTdHlsZTogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBhbGwgY29sdW1uIGhlYWRlcnMgKi9cbiAgaGVhZGVyQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRml4ZWQgaGVpZ2h0IG9mIGhlYWRlciByb3cgKi9cbiAgaGVhZGVySGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBGaXhlZC9hdmFpbGFibGUgaGVpZ2h0IGZvciBvdXQgRE9NIGVsZW1lbnQgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHRhYmxlIGJvZHkgcm93cyB3aGVuIHJvd0NvdW50IGlzIDAgKi9cbiAgbm9Sb3dzUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgKiBPcHRpb25hbCBjYWxsYmFjayB3aGVuIGEgY29sdW1uJ3MgaGVhZGVyIGlzIGNsaWNrZWQuXG4gICogKHsgY29sdW1uRGF0YTogYW55LCBkYXRhS2V5OiBzdHJpbmcgfSk6IHZvaWRcbiAgKi9cbiAgb25IZWFkZXJDbGljazogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKiBPcHRpb25hbCBjdXN0b20gaW5saW5lIHN0eWxlIHRvIGF0dGFjaCB0byB0YWJsZSBoZWFkZXIgY29sdW1ucy4gKi9cbiAgaGVhZGVyU3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIHRhYmxlIHJvdy5cbiAgICogKHsgaW5kZXg6IG51bWJlciB9KTogdm9pZFxuICAgKi9cbiAgb25Sb3dDbGljazogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gYSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gYSB0YWJsZSByb3cuXG4gICAqICh7IGluZGV4OiBudW1iZXIgfSk6IHZvaWRcbiAgICovXG4gIG9uUm93RG91YmxlQ2xpY2s6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHRoZSBtb3VzZSBsZWF2ZXMgYSB0YWJsZSByb3cuXG4gICAqICh7IGluZGV4OiBudW1iZXIgfSk6IHZvaWRcbiAgICovXG4gIG9uUm93TW91c2VPdXQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGEgdXNlciBtb3ZlcyB0aGUgbW91c2Ugb3ZlciBhIHRhYmxlIHJvdy5cbiAgICogKHsgaW5kZXg6IG51bWJlciB9KTogdm9pZFxuICAgKi9cbiAgb25Sb3dNb3VzZU92ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzbGljZSBvZiByb3dzIHRoYXQgd2VyZSBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uUm93c1JlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AgfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgbGlzdC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBvdmVyc2NhblJvd0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gYWxsIHRhYmxlIHJvd3MgKGluY2x1ZGluZyB0aGUgaGVhZGVyIHJvdykuXG4gICAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIGEgQ1NTIGNsYXNzIG5hbWUgKHN0cmluZykgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBjbGFzcyBuYW1lLlxuICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGl0cyBzaWduYXR1cmUgc2hvdWxkIGJlOiAoeyBpbmRleDogbnVtYmVyIH0pOiBzdHJpbmdcbiAgICovXG4gIHJvd0NsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyBhIGRhdGEgcm93IGdpdmVuIGFuIGluZGV4LlxuICAgKiAoeyBpbmRleDogbnVtYmVyIH0pOiBhbnlcbiAgICovXG4gIHJvd0dldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIHJvdyBoZWlnaHQgKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiBhIHJvdyBnaXZlbiBpdHMgaW5kZXguXG4gICAqICh7IGluZGV4OiBudW1iZXIgfSk6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE51bWJlciBvZiByb3dzIGluIHRhYmxlLiAqL1xuICByb3dDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIHRhYmxlIHJvdyBnaXZlbiBhbiBhcnJheSBvZiBjb2x1bW5zOlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoe1xuICAgKiAgIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgKiAgIGNvbHVtbnM6IEFycmF5LFxuICAgKiAgIGluZGV4OiBudW1iZXIsXG4gICAqICAgaXNTY3JvbGxpbmc6IGJvb2xlYW4sXG4gICAqICAgb25Sb3dDbGljazogP0Z1bmN0aW9uLFxuICAgKiAgIG9uUm93RG91YmxlQ2xpY2s6ID9GdW5jdGlvbixcbiAgICogICBvblJvd01vdXNlT3ZlcjogP0Z1bmN0aW9uLFxuICAgKiAgIG9uUm93TW91c2VPdXQ6ID9GdW5jdGlvbixcbiAgICogICByb3dEYXRhOiBhbnksXG4gICAqICAgc3R5bGU6IGFueVxuICAgKiB9KTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIHJvd1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIE9wdGlvbmFsIGN1c3RvbSBpbmxpbmUgc3R5bGUgdG8gYXR0YWNoIHRvIHRhYmxlIHJvd3MuICovXG4gIHJvd1N0eWxlOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgZm9yIGluZGl2aWR1YWwgcm93cyAqL1xuICByb3dXcmFwcGVyQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLFxuXG4gIC8qKiBPcHRpb25hbCBjdXN0b20gQ1NTIGNsYXNzIGZvciBpbmRpdmlkdWFsIHJvd3MgKi9cbiAgcm93V3JhcHBlclN0eWxlOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLFxuXG4gIC8qKiBTZWUgR3JpZCNzY3JvbGxUb0FsaWdubWVudCAqL1xuICBzY3JvbGxUb0FsaWdubWVudDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2F1dG8nLCAnZW5kJywgJ3N0YXJ0JywgJ2NlbnRlciddKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkgKi9cbiAgc2Nyb2xsVG9JbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogU29ydCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgaWYgYSBzb3J0YWJsZSBoZWFkZXIgaXMgY2xpY2tlZC5cbiAgICogKHsgc29ydEJ5OiBzdHJpbmcsIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24gfSk6IHZvaWRcbiAgICovXG4gIHNvcnQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKiogRmxleFRhYmxlIGRhdGEgaXMgY3VycmVudGx5IHNvcnRlZCBieSB0aGlzIDpkYXRhS2V5IChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0Qnk6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBGbGV4VGFibGUgZGF0YSBpcyBjdXJyZW50bHkgc29ydGVkIGluIHRoaXMgZGlyZWN0aW9uIChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0RGlyZWN0aW9uOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsIF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NdKSxcblxuICAvKiogT3B0aW9uYWwgaW5saW5lIHN0eWxlICovXG4gIHN0eWxlOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKiogVGFiIGluZGV4IGZvciBmb2N1cyAqL1xuICB0YWJJbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFdpZHRoIG9mIGxpc3QgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5GbGV4VGFibGUuZGVmYXVsdFByb3BzID0ge1xuICBkaXNhYmxlSGVhZGVyOiBmYWxzZSxcbiAgZXN0aW1hdGVkUm93U2l6ZTogMzAsXG4gIGhlYWRlckhlaWdodDogMCxcbiAgaGVhZGVyU3R5bGU6IHt9LFxuICBub1Jvd3NSZW5kZXJlcjogZnVuY3Rpb24gbm9Sb3dzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uUm93c1JlbmRlcmVkOiBmdW5jdGlvbiBvblJvd3NSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhblJvd0NvdW50OiAxMCxcbiAgcm93UmVuZGVyZXI6IF9kZWZhdWx0Um93UmVuZGVyZXIyLmRlZmF1bHQsXG4gIHJvd1N0eWxlOiB7fSxcbiAgc2Nyb2xsVG9BbGlnbm1lbnQ6ICdhdXRvJyxcbiAgc3R5bGU6IHt9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gRmxleFRhYmxlOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBTb3J0RGlyZWN0aW9uID0ge1xuICAvKipcbiAgICogU29ydCBpdGVtcyBpbiBhc2NlbmRpbmcgb3JkZXIuXG4gICAqIFRoaXMgbWVhbnMgYXJyYW5naW5nIGZyb20gdGhlIGxvd2VzdCB2YWx1ZSB0byB0aGUgaGlnaGVzdCAoZS5nLiBhLXosIDAtOSkuXG4gICAqL1xuICBBU0M6ICdBU0MnLFxuXG4gIC8qKlxuICAgKiBTb3J0IGl0ZW1zIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gICAqIFRoaXMgbWVhbnMgYXJyYW5naW5nIGZyb20gdGhlIGhpZ2hlc3QgdmFsdWUgdG8gdGhlIGxvd2VzdCAoZS5nLiB6LWEsIDktMCkuXG4gICAqL1xuICBERVNDOiAnREVTQydcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnREaXJlY3Rpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gU29ydEluZGljYXRvcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBEaXNwbGF5ZWQgYmVzaWRlIGEgaGVhZGVyIHRvIGluZGljYXRlIHRoYXQgYSBGbGV4VGFibGUgaXMgY3VycmVudGx5IHNvcnRlZCBieSB0aGlzIGNvbHVtbi5cbiAqL1xuZnVuY3Rpb24gU29ydEluZGljYXRvcihfcmVmKSB7XG4gIHZhciBzb3J0RGlyZWN0aW9uID0gX3JlZi5zb3J0RGlyZWN0aW9uO1xuXG4gIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24nLCB7XG4gICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uLS1BU0MnOiBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsXG4gICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uLS1ERVNDJzogc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ1xuICB9KTtcblxuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ3N2ZycsXG4gICAge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgd2lkdGg6IDE4LFxuICAgICAgaGVpZ2h0OiAxOCxcbiAgICAgIHZpZXdCb3g6ICcwIDAgMjQgMjQnXG4gICAgfSxcbiAgICBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ003IDE0bDUtNSA1IDV6JyB9KSA6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTcgMTBsNSA1IDUtNXonIH0pLFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTAgMGgyNHYyNEgweicsIGZpbGw6ICdub25lJyB9KVxuICApO1xufVxuU29ydEluZGljYXRvci5wcm9wVHlwZXMgPSB7XG4gIHNvcnREaXJlY3Rpb246IF9yZWFjdC5Qcm9wVHlwZXMub25lT2YoW19Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQywgX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ10pXG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRDZWxsRGF0YUdldHRlcjtcblxuXG4vKipcbiAqIERlZmF1bHQgYWNjZXNzb3IgZm9yIHJldHVybmluZyBhIGNlbGwgdmFsdWUgZm9yIGEgZ2l2ZW4gYXR0cmlidXRlLlxuICogVGhpcyBmdW5jdGlvbiBleHBlY3RzIHRvIG9wZXJhdGUgb24gZWl0aGVyIGEgdmFuaWxsYSBPYmplY3Qgb3IgYW4gSW1tdXRhYmxlIE1hcC5cbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlIGNvbHVtbidzIGNlbGxEYXRhR2V0dGVyIGlmIHlvdXIgZGF0YSBpcyBzb21lIG90aGVyIHR5cGUgb2Ygb2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbERhdGFHZXR0ZXIoX3JlZikge1xuICB2YXIgY29sdW1uRGF0YSA9IF9yZWYuY29sdW1uRGF0YTtcbiAgdmFyIGRhdGFLZXkgPSBfcmVmLmRhdGFLZXk7XG4gIHZhciByb3dEYXRhID0gX3JlZi5yb3dEYXRhO1xuXG4gIGlmIChyb3dEYXRhLmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHJvd0RhdGEuZ2V0KGRhdGFLZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3dEYXRhW2RhdGFLZXldO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdENlbGxSZW5kZXJlcjtcblxuXG4vKipcbiAqIERlZmF1bHQgY2VsbCByZW5kZXJlciB0aGF0IGRpc3BsYXlzIGFuIGF0dHJpYnV0ZSBhcyBhIHNpbXBsZSBzdHJpbmdcbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlIGNvbHVtbidzIGNlbGxSZW5kZXJlciBpZiB5b3VyIGRhdGEgaXMgc29tZSBvdGhlciB0eXBlIG9mIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENlbGxSZW5kZXJlcihfcmVmKSB7XG4gIHZhciBjZWxsRGF0YSA9IF9yZWYuY2VsbERhdGE7XG4gIHZhciBjZWxsRGF0YUtleSA9IF9yZWYuY2VsbERhdGFLZXk7XG4gIHZhciBjb2x1bW5EYXRhID0gX3JlZi5jb2x1bW5EYXRhO1xuICB2YXIgcm93RGF0YSA9IF9yZWYucm93RGF0YTtcbiAgdmFyIHJvd0luZGV4ID0gX3JlZi5yb3dJbmRleDtcblxuICBpZiAoY2VsbERhdGEgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gU3RyaW5nKGNlbGxEYXRhKTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRIZWFkZXJSZW5kZXJlcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIERlZmF1bHQgdGFibGUgaGVhZGVyIHJlbmRlcmVyLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0SGVhZGVyUmVuZGVyZXIoX3JlZikge1xuICB2YXIgY29sdW1uRGF0YSA9IF9yZWYuY29sdW1uRGF0YTtcbiAgdmFyIGRhdGFLZXkgPSBfcmVmLmRhdGFLZXk7XG4gIHZhciBkaXNhYmxlU29ydCA9IF9yZWYuZGlzYWJsZVNvcnQ7XG4gIHZhciBsYWJlbCA9IF9yZWYubGFiZWw7XG4gIHZhciBzb3J0QnkgPSBfcmVmLnNvcnRCeTtcbiAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcmVmLnNvcnREaXJlY3Rpb247XG5cbiAgdmFyIHNob3dTb3J0SW5kaWNhdG9yID0gc29ydEJ5ID09PSBkYXRhS2V5O1xuICB2YXIgY2hpbGRyZW4gPSBbX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ3NwYW4nLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9faGVhZGVyVHJ1bmNhdGVkVGV4dCcsXG4gICAgICBrZXk6ICdsYWJlbCcsXG4gICAgICB0aXRsZTogbGFiZWxcbiAgICB9LFxuICAgIGxhYmVsXG4gICldO1xuXG4gIGlmIChzaG93U29ydEluZGljYXRvcikge1xuICAgIGNoaWxkcmVuLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1NvcnRJbmRpY2F0b3IyLmRlZmF1bHQsIHtcbiAgICAgIGtleTogJ1NvcnRJbmRpY2F0b3InLFxuICAgICAgc29ydERpcmVjdGlvbjogc29ydERpcmVjdGlvblxuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlbjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRSb3dSZW5kZXJlcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIERlZmF1bHQgcm93IHJlbmRlcmVyIGZvciBGbGV4VGFibGUuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRSb3dSZW5kZXJlcihfcmVmKSB7XG4gIHZhciBjbGFzc05hbWUgPSBfcmVmLmNsYXNzTmFtZTtcbiAgdmFyIGNvbHVtbnMgPSBfcmVmLmNvbHVtbnM7XG4gIHZhciBpbmRleCA9IF9yZWYuaW5kZXg7XG4gIHZhciBpc1Njcm9sbGluZyA9IF9yZWYuaXNTY3JvbGxpbmc7XG4gIHZhciBvblJvd0NsaWNrID0gX3JlZi5vblJvd0NsaWNrO1xuICB2YXIgb25Sb3dEb3VibGVDbGljayA9IF9yZWYub25Sb3dEb3VibGVDbGljaztcbiAgdmFyIG9uUm93TW91c2VPdmVyID0gX3JlZi5vblJvd01vdXNlT3ZlcjtcbiAgdmFyIG9uUm93TW91c2VPdXQgPSBfcmVmLm9uUm93TW91c2VPdXQ7XG4gIHZhciByb3dEYXRhID0gX3JlZi5yb3dEYXRhO1xuICB2YXIgc3R5bGUgPSBfcmVmLnN0eWxlO1xuXG4gIHZhciBhMTF5UHJvcHMgPSB7fTtcblxuICBpZiAob25Sb3dDbGljayB8fCBvblJvd0RvdWJsZUNsaWNrIHx8IG9uUm93TW91c2VPdmVyIHx8IG9uUm93TW91c2VPdXQpIHtcbiAgICBhMTF5UHJvcHNbJ2FyaWEtbGFiZWwnXSA9ICdyb3cnO1xuICAgIGExMXlQcm9wcy5yb2xlID0gJ3Jvdyc7XG4gICAgYTExeVByb3BzLnRhYkluZGV4ID0gMDtcblxuICAgIGlmIChvblJvd0NsaWNrKSB7XG4gICAgICBhMTF5UHJvcHMub25DbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9uUm93Q2xpY2soeyBpbmRleDogaW5kZXggfSk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAob25Sb3dEb3VibGVDbGljaykge1xuICAgICAgYTExeVByb3BzLm9uRG91YmxlQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvblJvd0RvdWJsZUNsaWNrKHsgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG9uUm93TW91c2VPdXQpIHtcbiAgICAgIGExMXlQcm9wcy5vbk1vdXNlT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb25Sb3dNb3VzZU91dCh7IGluZGV4OiBpbmRleCB9KTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChvblJvd01vdXNlT3Zlcikge1xuICAgICAgYTExeVByb3BzLm9uTW91c2VPdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gb25Sb3dNb3VzZU92ZXIoeyBpbmRleDogaW5kZXggfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBfZXh0ZW5kcyh7fSwgYTExeVByb3BzLCB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pLFxuICAgIGNvbHVtbnNcbiAgKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRJbmRpY2F0b3IgPSBleHBvcnRzLlNvcnREaXJlY3Rpb24gPSBleHBvcnRzLkZsZXhDb2x1bW4gPSBleHBvcnRzLkZsZXhUYWJsZSA9IGV4cG9ydHMuZGVmYXVsdFJvd1JlbmRlcmVyID0gZXhwb3J0cy5kZWZhdWx0SGVhZGVyUmVuZGVyZXIgPSBleHBvcnRzLmRlZmF1bHRDZWxsUmVuZGVyZXIgPSBleHBvcnRzLmRlZmF1bHRDZWxsRGF0YUdldHRlciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9GbGV4VGFibGUyID0gcmVxdWlyZSgnLi9GbGV4VGFibGUnKTtcblxudmFyIF9GbGV4VGFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleFRhYmxlMik7XG5cbnZhciBfZGVmYXVsdENlbGxEYXRhR2V0dGVyMiA9IHJlcXVpcmUoJy4vZGVmYXVsdENlbGxEYXRhR2V0dGVyJyk7XG5cbnZhciBfZGVmYXVsdENlbGxEYXRhR2V0dGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDZWxsRGF0YUdldHRlcjIpO1xuXG52YXIgX2RlZmF1bHRDZWxsUmVuZGVyZXIyID0gcmVxdWlyZSgnLi9kZWZhdWx0Q2VsbFJlbmRlcmVyJyk7XG5cbnZhciBfZGVmYXVsdENlbGxSZW5kZXJlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0Q2VsbFJlbmRlcmVyMik7XG5cbnZhciBfZGVmYXVsdEhlYWRlclJlbmRlcmVyMiA9IHJlcXVpcmUoJy4vZGVmYXVsdEhlYWRlclJlbmRlcmVyJyk7XG5cbnZhciBfZGVmYXVsdEhlYWRlclJlbmRlcmVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRIZWFkZXJSZW5kZXJlcjIpO1xuXG52YXIgX2RlZmF1bHRSb3dSZW5kZXJlcjIgPSByZXF1aXJlKCcuL2RlZmF1bHRSb3dSZW5kZXJlcicpO1xuXG52YXIgX2RlZmF1bHRSb3dSZW5kZXJlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0Um93UmVuZGVyZXIyKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IHJlcXVpcmUoJy4vRmxleENvbHVtbicpO1xuXG52YXIgX0ZsZXhDb2x1bW4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleENvbHVtbjIpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uMik7XG5cbnZhciBfU29ydEluZGljYXRvcjIgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0ZsZXhUYWJsZTMuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdENlbGxEYXRhR2V0dGVyID0gX2RlZmF1bHRDZWxsRGF0YUdldHRlcjMuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdENlbGxSZW5kZXJlciA9IF9kZWZhdWx0Q2VsbFJlbmRlcmVyMy5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0SGVhZGVyUmVuZGVyZXIgPSBfZGVmYXVsdEhlYWRlclJlbmRlcmVyMy5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0Um93UmVuZGVyZXIgPSBfZGVmYXVsdFJvd1JlbmRlcmVyMy5kZWZhdWx0O1xuZXhwb3J0cy5GbGV4VGFibGUgPSBfRmxleFRhYmxlMy5kZWZhdWx0O1xuZXhwb3J0cy5GbGV4Q29sdW1uID0gX0ZsZXhDb2x1bW4zLmRlZmF1bHQ7XG5leHBvcnRzLlNvcnREaXJlY3Rpb24gPSBfU29ydERpcmVjdGlvbjMuZGVmYXVsdDtcbmV4cG9ydHMuU29ydEluZGljYXRvciA9IF9Tb3J0SW5kaWNhdG9yMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuREVGQVVMVF9TQ1JPTExJTkdfUkVTRVRfVElNRV9JTlRFUlZBTCA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0ID0gcmVxdWlyZSgnLi91dGlscy9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0Jyk7XG5cbnZhciBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0KTtcblxudmFyIF9TY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuL3V0aWxzL1NjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcicpO1xuXG52YXIgX1NjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIpO1xuXG52YXIgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIgPSByZXF1aXJlKCcuLi91dGlscy9jcmVhdGVDYWxsYmFja01lbW9pemVyJyk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDYWxsYmFja01lbW9pemVyKTtcblxudmFyIF9nZXRPdmVyc2NhbkluZGljZXMgPSByZXF1aXJlKCcuL3V0aWxzL2dldE92ZXJzY2FuSW5kaWNlcycpO1xuXG52YXIgX2dldE92ZXJzY2FuSW5kaWNlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRPdmVyc2NhbkluZGljZXMpO1xuXG52YXIgX3Njcm9sbGJhclNpemUgPSByZXF1aXJlKCdkb20taGVscGVycy91dGlsL3Njcm9sbGJhclNpemUnKTtcblxudmFyIF9zY3JvbGxiYXJTaXplMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbGJhclNpemUpO1xuXG52YXIgX3JhZiA9IHJlcXVpcmUoJ3JhZicpO1xuXG52YXIgX3JhZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYWYpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxudmFyIF91cGRhdGVTY3JvbGxJbmRleEhlbHBlciA9IHJlcXVpcmUoJy4vdXRpbHMvdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXInKTtcblxudmFyIF91cGRhdGVTY3JvbGxJbmRleEhlbHBlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91cGRhdGVTY3JvbGxJbmRleEhlbHBlcik7XG5cbnZhciBfZGVmYXVsdENlbGxSYW5nZVJlbmRlcmVyID0gcmVxdWlyZSgnLi9kZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXInKTtcblxudmFyIF9kZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdENlbGxSYW5nZVJlbmRlcmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIG1pbGlzZWNvbmRzIGR1cmluZyB3aGljaCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICogVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgbWFrZXMgc2Nyb2xsaW5nIHNtb290aGVyLlxuICovXG52YXIgREVGQVVMVF9TQ1JPTExJTkdfUkVTRVRfVElNRV9JTlRFUlZBTCA9IGV4cG9ydHMuREVGQVVMVF9TQ1JPTExJTkdfUkVTRVRfVElNRV9JTlRFUlZBTCA9IDE1MDtcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIHRoZSBHcmlkIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50J3Mgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgb3IganVzdCBvYnNlcnZlcyBpdC5cbiAqIFRoaXMgcHJldmVudHMgR3JpZCBmcm9tIGludGVycnVwdGluZyBtb3VzZS13aGVlbCBhbmltYXRpb25zIChzZWUgaXNzdWUgIzIpLlxuICovXG52YXIgU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TID0ge1xuICBPQlNFUlZFRDogJ29ic2VydmVkJyxcbiAgUkVRVUVTVEVEOiAncmVxdWVzdGVkJ1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRhYnVsYXIgZGF0YSB3aXRoIHZpcnR1YWxpemF0aW9uIGFsb25nIHRoZSB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBheGVzLlxuICogUm93IGhlaWdodHMgYW5kIGNvbHVtbiB3aWR0aHMgbXVzdCBiZSBrbm93biBhaGVhZCBvZiB0aW1lIGFuZCBzcGVjaWZpZWQgYXMgcHJvcGVydGllcy5cbiAqL1xuXG52YXIgR3JpZCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhHcmlkLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHcmlkKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdyaWQpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdyaWQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihHcmlkKSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBzY3JvbGxEaXJlY3Rpb25Ib3Jpem9udGFsOiBfZ2V0T3ZlcnNjYW5JbmRpY2VzLlNDUk9MTF9ESVJFQ1RJT05fRklYRUQsXG4gICAgICBzY3JvbGxEaXJlY3Rpb25WZXJ0aWNhbDogX2dldE92ZXJzY2FuSW5kaWNlcy5TQ1JPTExfRElSRUNUSU9OX0ZJWEVELFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG5cbiAgICAvLyBJbnZva2VzIG9uU2VjdGlvblJlbmRlcmVkIGNhbGxiYWNrIG9ubHkgd2hlbiBzdGFydC9zdG9wIHJvdyBvciBjb2x1bW4gaW5kaWNlcyBjaGFuZ2VcbiAgICBfdGhpcy5fb25HcmlkUmVuZGVyZWRNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoKTtcbiAgICBfdGhpcy5fb25TY3JvbGxNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoZmFsc2UpO1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gaW5zdGFuY2Ugc28gdGhleSBkb24ndCBsb3NlIGNvbnRleHQgd2hlbiBwYXNzZWQgYXJvdW5kXG4gICAgX3RoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5Q2FsbGJhY2sgPSBfdGhpcy5fZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXlDYWxsYmFjay5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIgPSBfdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9zZXROZXh0U3RhdGVDYWxsYmFjayA9IF90aGlzLl9zZXROZXh0U3RhdGVDYWxsYmFjay5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uID0gX3RoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cgPSBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cuYmluZChfdGhpcyk7XG5cbiAgICBfdGhpcy5fY29sdW1uV2lkdGhHZXR0ZXIgPSBfdGhpcy5fd3JhcFNpemVHZXR0ZXIocHJvcHMuY29sdW1uV2lkdGgpO1xuICAgIF90aGlzLl9yb3dIZWlnaHRHZXR0ZXIgPSBfdGhpcy5fd3JhcFNpemVHZXR0ZXIocHJvcHMucm93SGVpZ2h0KTtcblxuICAgIF90aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyID0gbmV3IF9TY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIyLmRlZmF1bHQoe1xuICAgICAgY2VsbENvdW50OiBwcm9wcy5jb2x1bW5Db3VudCxcbiAgICAgIGNlbGxTaXplR2V0dGVyOiBmdW5jdGlvbiBjZWxsU2l6ZUdldHRlcihpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuX2NvbHVtbldpZHRoR2V0dGVyKGluZGV4KTtcbiAgICAgIH0sXG4gICAgICBlc3RpbWF0ZWRDZWxsU2l6ZTogX3RoaXMuX2dldEVzdGltYXRlZENvbHVtblNpemUocHJvcHMpXG4gICAgfSk7XG4gICAgX3RoaXMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSBuZXcgX1NjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjIuZGVmYXVsdCh7XG4gICAgICBjZWxsQ291bnQ6IHByb3BzLnJvd0NvdW50LFxuICAgICAgY2VsbFNpemVHZXR0ZXI6IGZ1bmN0aW9uIGNlbGxTaXplR2V0dGVyKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5fcm93SGVpZ2h0R2V0dGVyKGluZGV4KTtcbiAgICAgIH0sXG4gICAgICBlc3RpbWF0ZWRDZWxsU2l6ZTogX3RoaXMuX2dldEVzdGltYXRlZFJvd1NpemUocHJvcHMpXG4gICAgfSk7XG5cbiAgICAvLyBTZWUgZGVmYXVsdENlbGxSYW5nZVJlbmRlcmVyKCkgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlIHVzYWdlIG9mIHRoaXMgY2FjaGVcbiAgICBfdGhpcy5fY2VsbENhY2hlID0ge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZS1tZWFzdXJlIGFsbCBjb2x1bW5zIGFuZCByb3dzIGluIGEgR3JpZC5cbiAgICogVHlwaWNhbGx5IGNlbGxzIGFyZSBvbmx5IG1lYXN1cmVkIGFzIG5lZWRlZCBhbmQgZXN0aW1hdGVkIHNpemVzIGFyZSB1c2VkIGZvciBjZWxscyB0aGF0IGhhdmUgbm90IHlldCBiZWVuIG1lYXN1cmVkLlxuICAgKiBUaGlzIG1ldGhvZCBlbnN1cmVzIHRoYXQgdGhlIG5leHQgY2FsbCB0byBnZXRUb3RhbFNpemUoKSByZXR1cm5zIGFuIGV4YWN0IHNpemUgKGFzIG9wcG9zZWQgdG8ganVzdCBhbiBlc3RpbWF0ZWQgb25lKS5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoR3JpZCwgW3tcbiAgICBrZXk6ICdtZWFzdXJlQWxsQ2VsbHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtZWFzdXJlQWxsQ2VsbHMoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5Db3VudCA9IF9wcm9wcy5jb2x1bW5Db3VudDtcbiAgICAgIHZhciByb3dDb3VudCA9IF9wcm9wcy5yb3dDb3VudDtcblxuXG4gICAgICB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFNpemVBbmRQb3NpdGlvbk9mQ2VsbChjb2x1bW5Db3VudCAtIDEpO1xuICAgICAgdGhpcy5fcm93U2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRTaXplQW5kUG9zaXRpb25PZkNlbGwocm93Q291bnQgLSAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JjZWQgcmVjb21wdXRlIG9mIHJvdyBoZWlnaHRzIGFuZCBjb2x1bW4gd2lkdGhzLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBpZiBkeW5hbWljIGNvbHVtbiBvciByb3cgc2l6ZXMgaGF2ZSBjaGFuZ2VkIGJ1dCBub3RoaW5nIGVsc2UgaGFzLlxuICAgICAqIFNpbmNlIEdyaWQgb25seSByZWNlaXZlcyA6Y29sdW1uQ291bnQgYW5kIDpyb3dDb3VudCBpdCBoYXMgbm8gd2F5IG9mIGRldGVjdGluZyB3aGVuIHRoZSB1bmRlcmx5aW5nIGRhdGEgY2hhbmdlcy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVjb21wdXRlR3JpZFNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVHcmlkU2l6ZSgpIHtcbiAgICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgICAgIHZhciBfcmVmJGNvbHVtbkluZGV4ID0gX3JlZi5jb2x1bW5JbmRleDtcbiAgICAgIHZhciBjb2x1bW5JbmRleCA9IF9yZWYkY29sdW1uSW5kZXggPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJGNvbHVtbkluZGV4O1xuICAgICAgdmFyIF9yZWYkcm93SW5kZXggPSBfcmVmLnJvd0luZGV4O1xuICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZiRyb3dJbmRleCA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkcm93SW5kZXg7XG5cbiAgICAgIHRoaXMuX2NvbHVtblNpemVBbmRQb3NpdGlvbk1hbmFnZXIucmVzZXRDZWxsKGNvbHVtbkluZGV4KTtcbiAgICAgIHRoaXMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIucmVzZXRDZWxsKHJvd0luZGV4KTtcblxuICAgICAgLy8gQ2xlYXIgY2VsbCBjYWNoZSBpbiBjYXNlIHdlIGFyZSBzY3JvbGxpbmc7XG4gICAgICAvLyBJbnZhbGlkIHJvdyBoZWlnaHRzIGxpa2VseSBtZWFuIGludmFsaWQgY2FjaGVkIGNvbnRlbnQgYXMgd2VsbC5cbiAgICAgIHRoaXMuX2NlbGxDYWNoZSA9IHt9O1xuXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3Byb3BzMi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gX3Byb3BzMi5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMyLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9wcm9wczIuc2Nyb2xsVG9Sb3c7XG5cbiAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IHdhcyBmaXJzdCByZW5kZXJlZCBzZXJ2ZXItc2lkZSwgc2Nyb2xsYmFyIHNpemUgd2lsbCBiZSB1bmRlZmluZWQuXG4gICAgICAvLyBJbiB0aGF0IGV2ZW50IHdlIG5lZWQgdG8gcmVtZWFzdXJlLlxuXG4gICAgICBpZiAoIXRoaXMuX3Njcm9sbGJhclNpemVNZWFzdXJlZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJTaXplID0gKDAsIF9zY3JvbGxiYXJTaXplMi5kZWZhdWx0KSgpO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJTaXplTWVhc3VyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCB8fCBzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9Db2x1bW4gPj0gMCB8fCBzY3JvbGxUb1JvdyA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbigpO1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgb25TY3JvbGwgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0IHx8IDAsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wIHx8IDAsXG4gICAgICAgIHRvdGFsQ29sdW1uc1dpZHRoOiB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFRvdGFsU2l6ZSgpLFxuICAgICAgICB0b3RhbFJvd3NIZWlnaHQ6IHRoaXMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0VG90YWxTaXplKClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogVGhpcyBtZXRob2QgdXBkYXRlcyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBpbiBzdGF0ZSBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAqIDEpIE5ldyBzY3JvbGwtdG8tY2VsbCBwcm9wcyBoYXZlIGJlZW4gc2V0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBhdXRvSGVpZ2h0ID0gX3Byb3BzMy5hdXRvSGVpZ2h0O1xuICAgICAgdmFyIGNvbHVtbkNvdW50ID0gX3Byb3BzMy5jb2x1bW5Db3VudDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMzLmhlaWdodDtcbiAgICAgIHZhciByb3dDb3VudCA9IF9wcm9wczMucm93Q291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9BbGlnbm1lbnQgPSBfcHJvcHMzLnNjcm9sbFRvQWxpZ25tZW50O1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gX3Byb3BzMy5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9wcm9wczMuc2Nyb2xsVG9Sb3c7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMzLndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZS5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID0gX3N0YXRlLnNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZS5zY3JvbGxUb3A7XG5cbiAgICAgIC8vIEhhbmRsZSBlZGdlIGNhc2Ugd2hlcmUgY29sdW1uIG9yIHJvdyBjb3VudCBoYXMgb25seSBqdXN0IGluY3JlYXNlZCBvdmVyIDAuXG4gICAgICAvLyBJbiB0aGlzIGNhc2Ugd2UgbWF5IGhhdmUgdG8gcmVzdG9yZSBhIHByZXZpb3VzbHktc3BlY2lmaWVkIHNjcm9sbCBvZmZzZXQuXG4gICAgICAvLyBGb3IgbW9yZSBpbmZvIHNlZSBidmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkL2lzc3Vlcy8yMThcblxuICAgICAgdmFyIGNvbHVtbk9yUm93Q291bnRKdXN0SW5jcmVhc2VkRnJvbVplcm8gPSBjb2x1bW5Db3VudCA+IDAgJiYgcHJldlByb3BzLmNvbHVtbkNvdW50ID09PSAwIHx8IHJvd0NvdW50ID4gMCAmJiBwcmV2UHJvcHMucm93Q291bnQgPT09IDA7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSByZXF1ZXN0ZWQgY2hhbmdlcyB0byA6c2Nyb2xsTGVmdCBvciA6c2Nyb2xsVG9wIGdldCBhcHBsaWVkLlxuICAgICAgLy8gQXNzaWduaW5nIHRvIHNjcm9sbExlZnQvc2Nyb2xsVG9wIHRlbGxzIHRoZSBicm93c2VyIHRvIGludGVycnVwdCBhbnkgcnVubmluZyBzY3JvbGwgYW5pbWF0aW9ucyxcbiAgICAgIC8vIEFuZCB0byBkaXNjYXJkIGFueSBwZW5kaW5nIGFzeW5jIGNoYW5nZXMgdG8gdGhlIHNjcm9sbCBwb3NpdGlvbiB0aGF0IG1heSBoYXZlIGhhcHBlbmVkIGluIHRoZSBtZWFudGltZSAoZS5nLiBvbiBhIHNlcGFyYXRlIHNjcm9sbGluZyB0aHJlYWQpLlxuICAgICAgLy8gU28gd2Ugb25seSBzZXQgdGhlc2Ugd2hlbiB3ZSByZXF1aXJlIGFuIGFkanVzdG1lbnQgb2YgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjMiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9PT0gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRCkge1xuICAgICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIChzY3JvbGxMZWZ0ICE9PSBwcmV2U3RhdGUuc2Nyb2xsTGVmdCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLl9zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsTGVmdCB8fCBjb2x1bW5PclJvd0NvdW50SnVzdEluY3JlYXNlZEZyb21aZXJvKSkge1xuICAgICAgICAgIHRoaXMuX3Njcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEBUUklDS1kgOmF1dG9IZWlnaHQgcHJvcGVydHkgaW5zdHJ1Y3RzIEdyaWQgdG8gbGVhdmUgOnNjcm9sbFRvcCBtYW5hZ2VtZW50IHRvIGFuIGV4dGVybmFsIEhPQyAoZWcgV2luZG93U2Nyb2xsZXIpLlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGF2b2lkIGNoZWNraW5nIHNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxUb3Agc2luY2UgaXQgZm9yY2VzIGxheW91dC9mbG93LlxuICAgICAgICBpZiAoIWF1dG9IZWlnaHQgJiYgc2Nyb2xsVG9wID49IDAgJiYgKHNjcm9sbFRvcCAhPT0gcHJldlN0YXRlLnNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IHRoaXMuX3Njcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxUb3AgfHwgY29sdW1uT3JSb3dDb3VudEp1c3RJbmNyZWFzZWRGcm9tWmVybykpIHtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgY3VycmVudCA6c2Nyb2xsVG9Db2x1bW4gb3IgOnNjcm9sbFRvUm93IHZhbHVlcyByZXF1aXJlcyBpdFxuICAgICAgLy8gQFRPRE8gRG8gd2UgYWxzbyBuZWVkIHRoaXMgY2hlY2sgb3IgY2FuIHRoZSBvbmUgaW4gY29tcG9uZW50V2lsbFVwZGF0ZSgpIHN1ZmZpY2U/XG4gICAgICAoMCwgX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyMi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyOiB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLFxuICAgICAgICBwcmV2aW91c0NlbGxzQ291bnQ6IHByZXZQcm9wcy5jb2x1bW5Db3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBwcmV2aW91c1Njcm9sbFRvQWxpZ25tZW50OiBwcmV2UHJvcHMuc2Nyb2xsVG9BbGlnbm1lbnQsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvQ29sdW1uLFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy53aWR0aCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb0FsaWdubWVudDogc2Nyb2xsVG9BbGlnbm1lbnQsXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHNjcm9sbFRvQ29sdW1uLFxuICAgICAgICBzaXplOiB3aWR0aCxcbiAgICAgICAgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjazogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayhzY3JvbGxUb0NvbHVtbikge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbihfZXh0ZW5kcyh7fSwgX3RoaXMyLnByb3BzLCB7IHNjcm9sbFRvQ29sdW1uOiBzY3JvbGxUb0NvbHVtbiB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgKDAsIF91cGRhdGVTY3JvbGxJbmRleEhlbHBlcjIuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjogdGhpcy5fcm93U2l6ZUFuZFBvc2l0aW9uTWFuYWdlcixcbiAgICAgICAgcHJldmlvdXNDZWxsc0NvdW50OiBwcmV2UHJvcHMucm93Q291bnQsXG4gICAgICAgIHByZXZpb3VzQ2VsbFNpemU6IHByZXZQcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9BbGlnbm1lbnQ6IHByZXZQcm9wcy5zY3JvbGxUb0FsaWdubWVudCxcbiAgICAgICAgcHJldmlvdXNTY3JvbGxUb0luZGV4OiBwcmV2UHJvcHMuc2Nyb2xsVG9Sb3csXG4gICAgICAgIHByZXZpb3VzU2l6ZTogcHJldlByb3BzLmhlaWdodCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbFRvQWxpZ25tZW50OiBzY3JvbGxUb0FsaWdubWVudCxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogc2Nyb2xsVG9Sb3csXG4gICAgICAgIHNpemU6IGhlaWdodCxcbiAgICAgICAgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjazogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayhzY3JvbGxUb1Jvdykge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KF9leHRlbmRzKHt9LCBfdGhpczIucHJvcHMsIHsgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvUm93IH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBvblJvd3NSZW5kZXJlZCBjYWxsYmFjayBpZiBzdGFydC9zdG9wIGluZGljZXMgaGF2ZSBjaGFuZ2VkXG4gICAgICB0aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IGlzIGJlaW5nIHJlbmRlcmVkIHNlcnZlci1zaWRlLCBnZXRTY3JvbGxiYXJTaXplKCkgd2lsbCByZXR1cm4gdW5kZWZpbmVkLlxuICAgICAgLy8gV2UgaGFuZGxlIHRoaXMgY2FzZSBpbiBjb21wb25lbnREaWRNb3VudCgpXG4gICAgICB0aGlzLl9zY3JvbGxiYXJTaXplID0gKDAsIF9zY3JvbGxiYXJTaXplMi5kZWZhdWx0KSgpO1xuICAgICAgaWYgKHRoaXMuX3Njcm9sbGJhclNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJTaXplTWVhc3VyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyU2l6ZSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJTaXplTWVhc3VyZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jYWxjdWxhdGVDaGlsZHJlblRvUmVuZGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBFbXB0eSBjb250ZW50ICgwIHJvd3Mgb3IgY29sdW1ucylcbiAgICAgKiAyKSBOZXcgc2Nyb2xsIHByb3BzIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiAzKSBDZWxscy1jb3VudCBvciBjZWxscy1zaXplIGhhcyBjaGFuZ2VkLCBtYWtpbmcgcHJldmlvdXMgc2Nyb2xsIG9mZnNldHMgaW52YWxpZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmIChuZXh0UHJvcHMuY29sdW1uQ291bnQgPT09IDAgJiYgbmV4dFN0YXRlLnNjcm9sbExlZnQgIT09IDAgfHwgbmV4dFByb3BzLnJvd0NvdW50ID09PSAwICYmIG5leHRTdGF0ZS5zY3JvbGxUb3AgIT09IDApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UHJvcHMuc2Nyb2xsTGVmdCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxMZWZ0IHx8IG5leHRQcm9wcy5zY3JvbGxUb3AgIT09IHRoaXMucHJvcHMuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBuZXh0UHJvcHMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IG5leHRQcm9wcy5zY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NvbHVtbldpZHRoR2V0dGVyID0gdGhpcy5fd3JhcFNpemVHZXR0ZXIobmV4dFByb3BzLmNvbHVtbldpZHRoKTtcbiAgICAgIHRoaXMuX3Jvd0hlaWdodEdldHRlciA9IHRoaXMuX3dyYXBTaXplR2V0dGVyKG5leHRQcm9wcy5yb3dIZWlnaHQpO1xuXG4gICAgICB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLmNvbmZpZ3VyZSh7XG4gICAgICAgIGNlbGxDb3VudDogbmV4dFByb3BzLmNvbHVtbkNvdW50LFxuICAgICAgICBlc3RpbWF0ZWRDZWxsU2l6ZTogdGhpcy5fZ2V0RXN0aW1hdGVkQ29sdW1uU2l6ZShuZXh0UHJvcHMpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIuY29uZmlndXJlKHtcbiAgICAgICAgY2VsbENvdW50OiBuZXh0UHJvcHMucm93Q291bnQsXG4gICAgICAgIGVzdGltYXRlZENlbGxTaXplOiB0aGlzLl9nZXRFc3RpbWF0ZWRSb3dTaXplKG5leHRQcm9wcylcbiAgICAgIH0pO1xuXG4gICAgICAvLyBVcGRhdGUgc2Nyb2xsIG9mZnNldHMgaWYgdGhlIHNpemUgb3IgbnVtYmVyIG9mIGNlbGxzIGhhdmUgY2hhbmdlZCwgaW52YWxpZGF0aW5nIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgKDAsIF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0Mi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogdGhpcy5wcm9wcy5jb2x1bW5Db3VudCxcbiAgICAgICAgY2VsbFNpemU6IHRoaXMucHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrOiBmdW5jdGlvbiBjb21wdXRlTWV0YWRhdGFDYWxsYmFjaygpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLnJlc2V0Q2VsbCgwKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wczogbmV4dFByb3BzLFxuICAgICAgICBuZXh0Q2VsbHNDb3VudDogbmV4dFByb3BzLmNvbHVtbkNvdW50LFxuICAgICAgICBuZXh0Q2VsbFNpemU6IG5leHRQcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4obmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICgwLCBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldDIuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsQ291bnQ6IHRoaXMucHJvcHMucm93Q291bnQsXG4gICAgICAgIGNlbGxTaXplOiB0aGlzLnByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IGZ1bmN0aW9uIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIucmVzZXRDZWxsKDApO1xuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzOiBuZXh0UHJvcHMsXG4gICAgICAgIG5leHRDZWxsc0NvdW50OiBuZXh0UHJvcHMucm93Q291bnQsXG4gICAgICAgIG5leHRDZWxsU2l6ZTogbmV4dFByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogZnVuY3Rpb24gdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdyhuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9jYWxjdWxhdGVDaGlsZHJlblRvUmVuZGVyKG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGF1dG9Db250YWluZXJXaWR0aCA9IF9wcm9wczQuYXV0b0NvbnRhaW5lcldpZHRoO1xuICAgICAgdmFyIGF1dG9IZWlnaHQgPSBfcHJvcHM0LmF1dG9IZWlnaHQ7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzNC5jbGFzc05hbWU7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNC5oZWlnaHQ7XG4gICAgICB2YXIgbm9Db250ZW50UmVuZGVyZXIgPSBfcHJvcHM0Lm5vQ29udGVudFJlbmRlcmVyO1xuICAgICAgdmFyIHN0eWxlID0gX3Byb3BzNC5zdHlsZTtcbiAgICAgIHZhciB0YWJJbmRleCA9IF9wcm9wczQudGFiSW5kZXg7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHM0LndpZHRoO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gdGhpcy5zdGF0ZS5pc1Njcm9sbGluZztcblxuXG4gICAgICB2YXIgZ3JpZFN0eWxlID0ge1xuICAgICAgICBoZWlnaHQ6IGF1dG9IZWlnaHQgPyAnYXV0bycgOiBoZWlnaHQsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfTtcblxuICAgICAgdmFyIHRvdGFsQ29sdW1uc1dpZHRoID0gdGhpcy5fY29sdW1uU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRUb3RhbFNpemUoKTtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSB0aGlzLl9yb3dTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICAvLyBGb3JjZSBicm93c2VyIHRvIGhpZGUgc2Nyb2xsYmFycyB3aGVuIHdlIGtub3cgdGhleSBhcmVuJ3QgbmVjZXNzYXJ5LlxuICAgICAgLy8gT3RoZXJ3aXNlIG9uY2Ugc2Nyb2xsYmFycyBhcHBlYXIgdGhleSBtYXkgbm90IGRpc2FwcGVhciBhZ2Fpbi5cbiAgICAgIC8vIEZvciBtb3JlIGluZm8gc2VlIGlzc3VlICMxMTZcbiAgICAgIHZhciB2ZXJ0aWNhbFNjcm9sbEJhclNpemUgPSB0b3RhbFJvd3NIZWlnaHQgPiBoZWlnaHQgPyB0aGlzLl9zY3JvbGxiYXJTaXplIDogMDtcbiAgICAgIHZhciBob3Jpem9udGFsU2Nyb2xsQmFyU2l6ZSA9IHRvdGFsQ29sdW1uc1dpZHRoID4gd2lkdGggPyB0aGlzLl9zY3JvbGxiYXJTaXplIDogMDtcblxuICAgICAgLy8gQWxzbyBleHBsaWNpdGx5IGluaXQgc3R5bGVzIHRvICdhdXRvJyBpZiBzY3JvbGxiYXJzIGFyZSByZXF1aXJlZC5cbiAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIG9ic2N1cmUgZWRnZSBjYXNlIHdoZXJlIGV4dGVybmFsIENTUyBzdHlsZXMgaGF2ZSBub3QgeWV0IGJlZW4gbG9hZGVkLFxuICAgICAgLy8gQnV0IGFuIGluaXRpYWwgc2Nyb2xsIGluZGV4IG9mIG9mZnNldCBpcyBzZXQgYXMgYW4gZXh0ZXJuYWwgcHJvcC5cbiAgICAgIC8vIFdpdGhvdXQgdGhpcyBzdHlsZSwgR3JpZCB3b3VsZCByZW5kZXIgdGhlIGNvcnJlY3QgcmFuZ2Ugb2YgY2VsbHMgYnV0IHdvdWxkIE5PVCB1cGRhdGUgaXRzIGludGVybmFsIG9mZnNldC5cbiAgICAgIC8vIFRoaXMgd2FzIG9yaWdpbmFsbHkgcmVwb3J0ZWQgdmlhIGNsYXVkZXJpYy9yZWFjdC1pbmZpbml0ZS1jYWxlbmRhci9pc3N1ZXMvMjNcbiAgICAgIGdyaWRTdHlsZS5vdmVyZmxvd1ggPSB0b3RhbENvbHVtbnNXaWR0aCArIHZlcnRpY2FsU2Nyb2xsQmFyU2l6ZSA8PSB3aWR0aCA/ICdoaWRkZW4nIDogJ2F1dG8nO1xuICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WSA9IHRvdGFsUm93c0hlaWdodCArIGhvcml6b250YWxTY3JvbGxCYXJTaXplIDw9IGhlaWdodCA/ICdoaWRkZW4nIDogJ2F1dG8nO1xuXG4gICAgICB2YXIgY2hpbGRyZW5Ub0Rpc3BsYXkgPSB0aGlzLl9jaGlsZHJlblRvRGlzcGxheTtcblxuICAgICAgdmFyIHNob3dOb0NvbnRlbnRSZW5kZXJlciA9IGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCAmJiBoZWlnaHQgPiAwICYmIHdpZHRoID4gMDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogZnVuY3Rpb24gcmVmKF9yZWYyKSB7XG4gICAgICAgICAgICBfdGhpczQuX3Njcm9sbGluZ0NvbnRhaW5lciA9IF9yZWYyO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdHcmlkJywgY2xhc3NOYW1lKSxcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgcm9sZTogJ2dyaWQnLFxuICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgZ3JpZFN0eWxlLCBzdHlsZSksXG4gICAgICAgICAgdGFiSW5kZXg6IHRhYkluZGV4XG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDAgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IGF1dG9Db250YWluZXJXaWR0aCA/ICdhdXRvJyA6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogaXNTY3JvbGxpbmcgPyAnbm9uZScgOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXlcbiAgICAgICAgKSxcbiAgICAgICAgc2hvd05vQ29udGVudFJlbmRlcmVyICYmIG5vQ29udGVudFJlbmRlcmVyKClcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBIZWxwZXIgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgfSwge1xuICAgIGtleTogJ19jYWxjdWxhdGVDaGlsZHJlblRvUmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NhbGN1bGF0ZUNoaWxkcmVuVG9SZW5kZXIoKSB7XG4gICAgICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gdGhpcy5zdGF0ZSA6IGFyZ3VtZW50c1sxXTtcbiAgICAgIHZhciBjZWxsQ2xhc3NOYW1lID0gcHJvcHMuY2VsbENsYXNzTmFtZTtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSBwcm9wcy5jZWxsUmVuZGVyZXI7XG4gICAgICB2YXIgY2VsbFJhbmdlUmVuZGVyZXIgPSBwcm9wcy5jZWxsUmFuZ2VSZW5kZXJlcjtcbiAgICAgIHZhciBjZWxsU3R5bGUgPSBwcm9wcy5jZWxsU3R5bGU7XG4gICAgICB2YXIgY29sdW1uQ291bnQgPSBwcm9wcy5jb2x1bW5Db3VudDtcbiAgICAgIHZhciBoZWlnaHQgPSBwcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5Db3VudCA9IHByb3BzLm92ZXJzY2FuQ29sdW1uQ291bnQ7XG4gICAgICB2YXIgb3ZlcnNjYW5Sb3dDb3VudCA9IHByb3BzLm92ZXJzY2FuUm93Q291bnQ7XG4gICAgICB2YXIgcm93Q291bnQgPSBwcm9wcy5yb3dDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IHByb3BzLndpZHRoO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gc3RhdGUuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgc2Nyb2xsRGlyZWN0aW9uSG9yaXpvbnRhbCA9IHN0YXRlLnNjcm9sbERpcmVjdGlvbkhvcml6b250YWw7XG4gICAgICB2YXIgc2Nyb2xsRGlyZWN0aW9uVmVydGljYWwgPSBzdGF0ZS5zY3JvbGxEaXJlY3Rpb25WZXJ0aWNhbDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBzdGF0ZS5zY3JvbGxUb3A7XG5cblxuICAgICAgdGhpcy5fY2hpbGRyZW5Ub0Rpc3BsYXkgPSBbXTtcblxuICAgICAgLy8gUmVuZGVyIG9ubHkgZW5vdWdoIGNvbHVtbnMgYW5kIHJvd3MgdG8gY292ZXIgdGhlIHZpc2libGUgYXJlYSBvZiB0aGUgZ3JpZC5cbiAgICAgIGlmIChoZWlnaHQgPiAwICYmIHdpZHRoID4gMCkge1xuICAgICAgICB2YXIgdmlzaWJsZUNvbHVtbkluZGljZXMgPSB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFZpc2libGVDZWxsUmFuZ2Uoe1xuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIG9mZnNldDogc2Nyb2xsTGVmdFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHZpc2libGVSb3dJbmRpY2VzID0gdGhpcy5fcm93U2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRWaXNpYmxlQ2VsbFJhbmdlKHtcbiAgICAgICAgICBjb250YWluZXJTaXplOiBoZWlnaHQsXG4gICAgICAgICAgb2Zmc2V0OiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGhvcml6b250YWxPZmZzZXRBZGp1c3RtZW50ID0gdGhpcy5fY29sdW1uU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRPZmZzZXRBZGp1c3RtZW50KHtcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBvZmZzZXQ6IHNjcm9sbExlZnRcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB2ZXJ0aWNhbE9mZnNldEFkanVzdG1lbnQgPSB0aGlzLl9yb3dTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldE9mZnNldEFkanVzdG1lbnQoe1xuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBvZmZzZXQ6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RvcDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RvcDtcblxuICAgICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5JbmRpY2VzID0gKDAsIF9nZXRPdmVyc2NhbkluZGljZXMyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsQ291bnQ6IGNvbHVtbkNvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ2VsbHNDb3VudDogb3ZlcnNjYW5Db2x1bW5Db3VudCxcbiAgICAgICAgICBzY3JvbGxEaXJlY3Rpb246IHNjcm9sbERpcmVjdGlvbkhvcml6b250YWwsXG4gICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIHN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG92ZXJzY2FuUm93SW5kaWNlcyA9ICgwLCBfZ2V0T3ZlcnNjYW5JbmRpY2VzMi5kZWZhdWx0KSh7XG4gICAgICAgICAgY2VsbENvdW50OiByb3dDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuUm93Q291bnQsXG4gICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uOiBzY3JvbGxEaXJlY3Rpb25WZXJ0aWNhbCxcbiAgICAgICAgICBzdGFydEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgc3RvcEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0b3BJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fY29sdW1uU3RhcnRJbmRleCA9IG92ZXJzY2FuQ29sdW1uSW5kaWNlcy5vdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX2NvbHVtblN0b3BJbmRleCA9IG92ZXJzY2FuQ29sdW1uSW5kaWNlcy5vdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCA9IG92ZXJzY2FuUm93SW5kaWNlcy5vdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd1N0b3BJbmRleCA9IG92ZXJzY2FuUm93SW5kaWNlcy5vdmVyc2NhblN0b3BJbmRleDtcblxuICAgICAgICB0aGlzLl9jaGlsZHJlblRvRGlzcGxheSA9IGNlbGxSYW5nZVJlbmRlcmVyKHtcbiAgICAgICAgICBjZWxsQ2FjaGU6IHRoaXMuX2NlbGxDYWNoZSxcbiAgICAgICAgICBjZWxsQ2xhc3NOYW1lOiB0aGlzLl93cmFwQ2VsbENsYXNzTmFtZUdldHRlcihjZWxsQ2xhc3NOYW1lKSxcbiAgICAgICAgICBjZWxsUmVuZGVyZXI6IGNlbGxSZW5kZXJlcixcbiAgICAgICAgICBjZWxsU3R5bGU6IHRoaXMuX3dyYXBDZWxsU3R5bGVHZXR0ZXIoY2VsbFN0eWxlKSxcbiAgICAgICAgICBjb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyOiB0aGlzLl9jb2x1bW5TaXplQW5kUG9zaXRpb25NYW5hZ2VyLFxuICAgICAgICAgIGNvbHVtblN0YXJ0SW5kZXg6IHRoaXMuX2NvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldEFkanVzdG1lbnQ6IGhvcml6b250YWxPZmZzZXRBZGp1c3RtZW50LFxuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBpc1Njcm9sbGluZyxcbiAgICAgICAgICByb3dTaXplQW5kUG9zaXRpb25NYW5hZ2VyOiB0aGlzLl9yb3dTaXplQW5kUG9zaXRpb25NYW5hZ2VyLFxuICAgICAgICAgIHJvd1N0YXJ0SW5kZXg6IHRoaXMuX3Jvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgcm93U3RvcEluZGV4OiB0aGlzLl9yb3dTdG9wSW5kZXgsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB2ZXJ0aWNhbE9mZnNldEFkanVzdG1lbnQ6IHZlcnRpY2FsT2Zmc2V0QWRqdXN0bWVudFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIDppc1Njcm9sbGluZyBmbGFnIGZvciBhIHNtYWxsIHdpbmRvdyBvZiB0aW1lLlxuICAgICAqIFRoaXMgZmxhZyBpcyB1c2VkIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgb24gdGhlIHNjcm9sbGFibGUgcG9ydGlvbiBvZiB0aGUgR3JpZC5cbiAgICAgKiBUaGlzIHByZXZlbnRzIGplcmt5L3N0dXR0ZXJ5IG1vdXNlLXdoZWVsIHNjcm9sbGluZy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCkge1xuICAgICAgdmFyIHNjcm9sbGluZ1Jlc2V0VGltZUludGVydmFsID0gdGhpcy5wcm9wcy5zY3JvbGxpbmdSZXNldFRpbWVJbnRlcnZhbDtcblxuXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5Q2FsbGJhY2ssIHNjcm9sbGluZ1Jlc2V0VGltZUludGVydmFsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXlDYWxsYmFjaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheUNhbGxiYWNrKCkge1xuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBudWxsO1xuXG4gICAgICAvLyBUaHJvdyBhd2F5IGNlbGwgY2FjaGUgb25jZSBzY3JvbGxpbmcgaXMgY29tcGxldGVcbiAgICAgIHRoaXMuX2NlbGxDYWNoZSA9IHt9O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICBzY3JvbGxEaXJlY3Rpb25Ib3Jpem9udGFsOiBfZ2V0T3ZlcnNjYW5JbmRpY2VzLlNDUk9MTF9ESVJFQ1RJT05fRklYRUQsXG4gICAgICAgIHNjcm9sbERpcmVjdGlvblZlcnRpY2FsOiBfZ2V0T3ZlcnNjYW5JbmRpY2VzLlNDUk9MTF9ESVJFQ1RJT05fRklYRURcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRFc3RpbWF0ZWRDb2x1bW5TaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEVzdGltYXRlZENvbHVtblNpemUocHJvcHMpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgcHJvcHMuY29sdW1uV2lkdGggPT09ICdudW1iZXInID8gcHJvcHMuY29sdW1uV2lkdGggOiBwcm9wcy5lc3RpbWF0ZWRDb2x1bW5TaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRFc3RpbWF0ZWRSb3dTaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEVzdGltYXRlZFJvd1NpemUocHJvcHMpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgcHJvcHMucm93SGVpZ2h0ID09PSAnbnVtYmVyJyA/IHByb3BzLnJvd0hlaWdodCA6IHByb3BzLmVzdGltYXRlZFJvd1NpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCkge1xuICAgICAgdmFyIG9uU2VjdGlvblJlbmRlcmVkID0gdGhpcy5wcm9wcy5vblNlY3Rpb25SZW5kZXJlZDtcblxuXG4gICAgICB0aGlzLl9vbkdyaWRSZW5kZXJlZE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IG9uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgY29sdW1uT3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9jb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtbk92ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtblN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgcm93T3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9yb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd092ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9yb3dTdG9wSW5kZXgsXG4gICAgICAgICAgcm93U3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd1N0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdG9wSW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25TY3JvbGxNZW1vaXplcihfcmVmMykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjMuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmMy5zY3JvbGxUb3A7XG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSBfcmVmMy50b3RhbENvbHVtbnNXaWR0aDtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSBfcmVmMy50b3RhbFJvd3NIZWlnaHQ7XG5cbiAgICAgIHRoaXMuX29uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soX3JlZjQpIHtcbiAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWY0LnNjcm9sbExlZnQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWY0LnNjcm9sbFRvcDtcbiAgICAgICAgICB2YXIgX3Byb3BzNSA9IF90aGlzNS5wcm9wcztcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNS5oZWlnaHQ7XG4gICAgICAgICAgdmFyIG9uU2Nyb2xsID0gX3Byb3BzNS5vblNjcm9sbDtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcHJvcHM1LndpZHRoO1xuXG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUgPSBzdGF0ZTtcblxuICAgICAgaWYgKCF0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkodGhpcy5fc2V0TmV4dFN0YXRlQ2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGVDYWxsYmFjaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXROZXh0U3RhdGVDYWxsYmFjaygpIHtcbiAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX25leHRTdGF0ZTtcblxuICAgICAgdGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCA9IG51bGw7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0U2Nyb2xsUG9zaXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0U2Nyb2xsUG9zaXRpb24oX3JlZjUpIHtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmNS5zY3JvbGxUb3A7XG5cbiAgICAgIHZhciBuZXdTdGF0ZSA9IHtcbiAgICAgICAgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb246IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURURcbiAgICAgIH07XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDAgJiYgc2Nyb2xsTGVmdCAhPT0gdGhpcy5zdGF0ZS5zY3JvbGxMZWZ0IHx8IHNjcm9sbFRvcCA+PSAwICYmIHNjcm9sbFRvcCAhPT0gdGhpcy5zdGF0ZS5zY3JvbGxUb3ApIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3dyYXBDZWxsQ2xhc3NOYW1lR2V0dGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3dyYXBDZWxsQ2xhc3NOYW1lR2V0dGVyKGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3dyYXBQcm9wZXJ0eUdldHRlcihjbGFzc05hbWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ193cmFwQ2VsbFN0eWxlR2V0dGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3dyYXBDZWxsU3R5bGVHZXR0ZXIoc3R5bGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl93cmFwUHJvcGVydHlHZXR0ZXIoc3R5bGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ193cmFwUHJvcGVydHlHZXR0ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfd3JhcFByb3BlcnR5R2V0dGVyKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHZhbHVlIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ193cmFwU2l6ZUdldHRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF93cmFwU2l6ZUdldHRlcihzaXplKSB7XG4gICAgICByZXR1cm4gdGhpcy5fd3JhcFByb3BlcnR5R2V0dGVyKHNpemUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKCkge1xuICAgICAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcyA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHRoaXMuc3RhdGUgOiBhcmd1bWVudHNbMV07XG4gICAgICB2YXIgY29sdW1uQ291bnQgPSBwcm9wcy5jb2x1bW5Db3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0FsaWdubWVudCA9IHByb3BzLnNjcm9sbFRvQWxpZ25tZW50O1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gcHJvcHMuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgd2lkdGggPSBwcm9wcy53aWR0aDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gc3RhdGUuc2Nyb2xsTGVmdDtcblxuXG4gICAgICBpZiAoc2Nyb2xsVG9Db2x1bW4gPj0gMCAmJiBjb2x1bW5Db3VudCA+IDApIHtcbiAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29sdW1uQ291bnQgLSAxLCBzY3JvbGxUb0NvbHVtbikpO1xuXG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsTGVmdCA9IHRoaXMuX2NvbHVtblNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KHtcbiAgICAgICAgICBhbGlnbjogc2Nyb2xsVG9BbGlnbm1lbnQsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogd2lkdGgsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogdGFyZ2V0SW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbExlZnQgIT09IGNhbGN1bGF0ZWRTY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgICAgc2Nyb2xsTGVmdDogY2FsY3VsYXRlZFNjcm9sbExlZnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdygpIHtcbiAgICAgIHZhciBwcm9wcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMgOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB0aGlzLnN0YXRlIDogYXJndW1lbnRzWzFdO1xuICAgICAgdmFyIGhlaWdodCA9IHByb3BzLmhlaWdodDtcbiAgICAgIHZhciByb3dDb3VudCA9IHByb3BzLnJvd0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvQWxpZ25tZW50ID0gcHJvcHMuc2Nyb2xsVG9BbGlnbm1lbnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBwcm9wcy5zY3JvbGxUb1JvdztcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBzdGF0ZS5zY3JvbGxUb3A7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvUm93ID49IDAgJiYgcm93Q291bnQgPiAwKSB7XG4gICAgICAgIHZhciB0YXJnZXRJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHJvd0NvdW50IC0gMSwgc2Nyb2xsVG9Sb3cpKTtcblxuICAgICAgICB2YXIgY2FsY3VsYXRlZFNjcm9sbFRvcCA9IHRoaXMuX3Jvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KHtcbiAgICAgICAgICBhbGlnbjogc2Nyb2xsVG9BbGlnbm1lbnQsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogaGVpZ2h0LFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbFRvcCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogdGFyZ2V0SW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCAhPT0gY2FsY3VsYXRlZFNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogY2FsY3VsYXRlZFNjcm9sbFRvcFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAvLyBJbiBjZXJ0YWluIGVkZ2UtY2FzZXMgUmVhY3QgZGlzcGF0Y2hlcyBhbiBvblNjcm9sbCBldmVudCB3aXRoIGFuIGludmFsaWQgdGFyZ2V0LnNjcm9sbExlZnQgLyB0YXJnZXQuc2Nyb2xsVG9wLlxuICAgICAgLy8gVGhpcyBpbnZhbGlkIGV2ZW50IGNhbiBiZSBkZXRlY3RlZCBieSBjb21wYXJpbmcgZXZlbnQudGFyZ2V0IHRvIHRoaXMgY29tcG9uZW50J3Mgc2Nyb2xsYWJsZSBET00gZWxlbWVudC5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjNDA0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fc2Nyb2xsaW5nQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBwb2ludGVyIGV2ZW50cyBmcm9tIGludGVycnVwdGluZyBhIHNtb290aCBzY3JvbGxcbiAgICAgIHRoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCk7XG5cbiAgICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgc2hydW5rIGRyYXN0aWNhbGx5LCBSZWFjdCBkaXNwYXRjaGVzIGEgc2VyaWVzIG9mIGJhY2stdG8tYmFjayBzY3JvbGwgZXZlbnRzLFxuICAgICAgLy8gR3JhZHVhbGx5IGNvbnZlcmdpbmcgb24gYSBzY3JvbGxUb3AgdGhhdCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgbmV3LCBzbWFsbGVyIGhlaWdodC5cbiAgICAgIC8vIFRoaXMgY2F1c2VzIGEgc2VyaWVzIG9mIHJhcGlkIHJlbmRlcnMgdGhhdCBpcyBzbG93IGZvciBsb25nIGxpc3RzLlxuICAgICAgLy8gV2UgY2FuIGF2b2lkIHRoYXQgYnkgZG9pbmcgc29tZSBzaW1wbGUgYm91bmRzIGNoZWNraW5nIHRvIGVuc3VyZSB0aGF0IHNjcm9sbFRvcCBuZXZlciBleGNlZWRzIHRoZSB0b3RhbCBoZWlnaHQuXG4gICAgICB2YXIgX3Byb3BzNiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNi5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHM2LndpZHRoO1xuXG4gICAgICB2YXIgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuX3Njcm9sbGJhclNpemU7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gdGhpcy5fcm93U2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRUb3RhbFNpemUoKTtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IHRoaXMuX2NvbHVtblNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0VG90YWxTaXplKCk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHRvdGFsQ29sdW1uc1dpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplKSwgZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHRvdGFsUm93c0hlaWdodCAtIGhlaWdodCArIHNjcm9sbGJhclNpemUpLCBldmVudC50YXJnZXQuc2Nyb2xsVG9wKTtcblxuICAgICAgLy8gQ2VydGFpbiBkZXZpY2VzIChsaWtlIEFwcGxlIHRvdWNocGFkKSByYXBpZC1maXJlIGR1cGxpY2F0ZSBldmVudHMuXG4gICAgICAvLyBEb24ndCBmb3JjZSBhIHJlLXJlbmRlciBpZiB0aGlzIGlzIHRoZSBjYXNlLlxuICAgICAgLy8gVGhlIG1vdXNlIG1heSBtb3ZlIGZhc3RlciB0aGVuIHRoZSBhbmltYXRpb24gZnJhbWUgZG9lcy5cbiAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gYXZvaWQgb3Zlci11cGRhdGluZy5cbiAgICAgIGlmICh0aGlzLnN0YXRlLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQgfHwgdGhpcy5zdGF0ZS5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgICAgICAvLyBCcm93c2VycyB3aXRoIGNhbmNlbGFibGUgc2Nyb2xsIGV2ZW50cyAoZWcuIEZpcmVmb3gpIGludGVycnVwdCBzY3JvbGxpbmcgYW5pbWF0aW9ucyBpZiBzY3JvbGxUb3Avc2Nyb2xsTGVmdCBpcyBzZXQuXG4gICAgICAgIC8vIE90aGVyIGJyb3dzZXJzIChlZy4gU2FmYXJpKSBkb24ndCBzY3JvbGwgYXMgd2VsbCB3aXRob3V0IHRoZSBoZWxwIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucyAoRE9NIG9yIHN0eWxlIGNoYW5nZXMgZHVyaW5nIHNjcm9sbGluZykuXG4gICAgICAgIC8vIEFsbCB0aGluZ3MgY29uc2lkZXJlZCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgYmVzdCBjdXJyZW50IHdvcmsgYXJvdW5kIHRoYXQgSSdtIGF3YXJlIG9mLlxuICAgICAgICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWQvcHVsbC8xMjRcbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID0gZXZlbnQuY2FuY2VsYWJsZSA/IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5PQlNFUlZFRCA6IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQ7XG5cbiAgICAgICAgLy8gVHJhY2sgc2Nyb2xsaW5nIGRpcmVjdGlvbiBzbyB3ZSBjYW4gbW9yZSBlZmZpY2llbnRseSBvdmVyc2NhbiByb3dzIHRvIHJlZHVjZSBlbXB0eSBzcGFjZSBhcm91bmQgdGhlIGVkZ2VzIHdoaWxlIHNjcm9sbGluZy5cbiAgICAgICAgdmFyIHNjcm9sbERpcmVjdGlvblZlcnRpY2FsID0gc2Nyb2xsVG9wID4gdGhpcy5zdGF0ZS5zY3JvbGxUb3AgPyBfZ2V0T3ZlcnNjYW5JbmRpY2VzLlNDUk9MTF9ESVJFQ1RJT05fRk9SV0FSRCA6IF9nZXRPdmVyc2NhbkluZGljZXMuU0NST0xMX0RJUkVDVElPTl9CQUNLV0FSRDtcbiAgICAgICAgdmFyIHNjcm9sbERpcmVjdGlvbkhvcml6b250YWwgPSBzY3JvbGxMZWZ0ID4gdGhpcy5zdGF0ZS5zY3JvbGxMZWZ0ID8gX2dldE92ZXJzY2FuSW5kaWNlcy5TQ1JPTExfRElSRUNUSU9OX0ZPUldBUkQgOiBfZ2V0T3ZlcnNjYW5JbmRpY2VzLlNDUk9MTF9ESVJFQ1RJT05fQkFDS1dBUkQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0TmV4dFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgICBzY3JvbGxEaXJlY3Rpb25Ib3Jpem9udGFsOiBzY3JvbGxEaXJlY3Rpb25Ib3Jpem9udGFsLFxuICAgICAgICAgIHNjcm9sbERpcmVjdGlvblZlcnRpY2FsOiBzY3JvbGxEaXJlY3Rpb25WZXJ0aWNhbCxcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbixcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wLCB0b3RhbENvbHVtbnNXaWR0aDogdG90YWxDb2x1bW5zV2lkdGgsIHRvdGFsUm93c0hlaWdodDogdG90YWxSb3dzSGVpZ2h0IH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBHcmlkO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuR3JpZC5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFNldCB0aGUgd2lkdGggb2YgdGhlIGlubmVyIHNjcm9sbGFibGUgY29udGFpbmVyIHRvICdhdXRvJy5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHNpbmdsZS1jb2x1bW4gR3JpZHMgdG8gZW5zdXJlIHRoYXQgdGhlIGNvbHVtbiBkb2Vzbid0IGV4dGVuZCBiZWxvdyBhIHZlcnRpY2FsIHNjcm9sbGJhci5cbiAgICovXG4gIGF1dG9Db250YWluZXJXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGZpeGVkIGhlaWdodCBmcm9tIHRoZSBzY3JvbGxpbmdDb250YWluZXIgc28gdGhhdCB0aGUgdG90YWwgaGVpZ2h0XG4gICAqIG9mIHJvd3MgY2FuIHN0cmV0Y2ggdGhlIHdpbmRvdy4gSW50ZW5kZWQgZm9yIHVzZSB3aXRoIFdpbmRvd1Njcm9sbGVyXG4gICAqL1xuICBhdXRvSGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgZm9yIGluZGl2aWR1YWwgY2VsbHMgKi9cbiAgY2VsbENsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKiogT3B0aW9uYWwgY3VzdG9tIHN0eWxlcyBmb3IgaW5kaXZpZHVhbCBjZWxscyAqL1xuICBjZWxsU3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSksXG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjZWxsIGdpdmVuIGFuIHJvdyBhbmQgY29sdW1uIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoeyBjb2x1bW5JbmRleDogbnVtYmVyLCByb3dJbmRleDogbnVtYmVyIH0pOiBQcm9wVHlwZXMubm9kZVxuICAgKi9cbiAgY2VsbFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGdyb3VwIG9mIGNlbGxzIGdpdmVuIHRoZWlyIGluZGV4IHJhbmdlcy5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHtcbiAgICogICBjZWxsQ2FjaGU6IE1hcCxcbiAgICogICBjZWxsUmVuZGVyZXI6IEZ1bmN0aW9uLFxuICAgKiAgIGNvbHVtblNpemVBbmRQb3NpdGlvbk1hbmFnZXI6IENlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLFxuICAgKiAgIGNvbHVtblN0YXJ0SW5kZXg6IG51bWJlcixcbiAgICogICBjb2x1bW5TdG9wSW5kZXg6IG51bWJlcixcbiAgICogICBpc1Njcm9sbGluZzogYm9vbGVhbixcbiAgICogICByb3dTaXplQW5kUG9zaXRpb25NYW5hZ2VyOiBDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcixcbiAgICogICByb3dTdGFydEluZGV4OiBudW1iZXIsXG4gICAqICAgcm93U3RvcEluZGV4OiBudW1iZXIsXG4gICAqICAgc2Nyb2xsTGVmdDogbnVtYmVyLFxuICAgKiAgIHNjcm9sbFRvcDogbnVtYmVyXG4gICAqIH0pOiBBcnJheTxQcm9wVHlwZXMubm9kZT5cbiAgICovXG4gIGNlbGxSYW5nZVJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgY3VzdG9tIENTUyBjbGFzcyBuYW1lIHRvIGF0dGFjaCB0byByb290IEdyaWQgZWxlbWVudC5cbiAgICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb2x1bW5zIGluIGdyaWQuXG4gICAqL1xuICBjb2x1bW5Db3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgY29sdW1uIHdpZHRoIChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB3aWR0aCBvZiBhIGNvbHVtbiBnaXZlbiBpdHMgaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6IChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICBjb2x1bW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVzdGltYXRlIHRoZSB0b3RhbCB3aWR0aCBvZiBhIEdyaWQgYmVmb3JlIGFsbCBvZiBpdHMgY29sdW1ucyBoYXZlIGFjdHVhbGx5IGJlZW4gbWVhc3VyZWQuXG4gICAqIFRoZSBlc3RpbWF0ZWQgdG90YWwgd2lkdGggaXMgYWRqdXN0ZWQgYXMgY29sdW1ucyBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBlc3RpbWF0ZWRDb2x1bW5TaXplOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVzdGltYXRlIHRoZSB0b3RhbCBoZWlnaHQgb2YgYSBHcmlkIGJlZm9yZSBhbGwgb2YgaXRzIHJvd3MgaGF2ZSBhY3R1YWxseSBiZWVuIG1lYXN1cmVkLlxuICAgKiBUaGUgZXN0aW1hdGVkIHRvdGFsIGhlaWdodCBpcyBhZGp1c3RlZCBhcyByb3dzIGFyZSByZW5kZXJlZC5cbiAgICovXG4gIGVzdGltYXRlZFJvd1NpemU6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiBHcmlkOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgcm93cy5cbiAgICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiByb3dzIHdoZW4gZWl0aGVyIDpyb3dDb3VudCBvciA6Y29sdW1uQ291bnQgaXMgMC5cbiAgICovXG4gIG5vQ29udGVudFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VjdGlvbiBvZiB0aGUgR3JpZCB0aGF0IHdhcyBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBjb2x1bW5TdGFydEluZGV4LCBjb2x1bW5TdG9wSW5kZXgsIHJvd1N0YXJ0SW5kZXgsIHJvd1N0b3BJbmRleCB9KTogdm9pZFxuICAgKi9cbiAgb25TZWN0aW9uUmVuZGVyZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY29sdW1ucyB0byByZW5kZXIgYmVmb3JlL2FmdGVyIHRoZSB2aXNpYmxlIHNlY3Rpb24gb2YgdGhlIGdyaWQuXG4gICAqIFRoZXNlIGNvbHVtbnMgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzIG9yIGJyb3dzZXJzIHRoYXQgc2VuZCBzY3JvbGwgZXZlbnRzIGluZnJlcXVlbnRseS5cbiAgICovXG4gIG92ZXJzY2FuQ29sdW1uQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBzZWN0aW9uIG9mIHRoZSBncmlkLlxuICAgKiBUaGVzZSByb3dzIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcyBvciBicm93c2VycyB0aGF0IHNlbmQgc2Nyb2xsIGV2ZW50cyBpbmZyZXF1ZW50bHkuXG4gICAqL1xuICBvdmVyc2NhblJvd0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoeyBpbmRleDogbnVtYmVyIH0pOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBncmlkLlxuICAgKi9cbiAgcm93Q291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFdhaXQgdGhpcyBhbW91bnQgb2YgdGltZSBhZnRlciB0aGUgbGFzdCBzY3JvbGwgZXZlbnQgYmVmb3JlIHJlc2V0dGluZyBHcmlkIGBwb2ludGVyLWV2ZW50c2AuICovXG4gIHNjcm9sbGluZ1Jlc2V0VGltZUludGVydmFsOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogSG9yaXpvbnRhbCBvZmZzZXQuICovXG4gIHNjcm9sbExlZnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBDb250cm9scyBzY3JvbGwtdG8tY2VsbCBiZWhhdmlvciBvZiB0aGUgR3JpZC5cbiAgICogVGhlIGRlZmF1bHQgKFwiYXV0b1wiKSBzY3JvbGxzIHRoZSBsZWFzdCBhbW91bnQgcG9zc2libGUgdG8gZW5zdXJlIHRoYXQgdGhlIHNwZWNpZmllZCBjZWxsIGlzIGZ1bGx5IHZpc2libGUuXG4gICAqIFVzZSBcInN0YXJ0XCIgdG8gYWxpZ24gY2VsbHMgdG8gdGhlIHRvcC9sZWZ0IG9mIHRoZSBHcmlkIGFuZCBcImVuZFwiIHRvIGFsaWduIGJvdHRvbS9yaWdodC5cbiAgICovXG4gIHNjcm9sbFRvQWxpZ25tZW50OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnYXV0bycsICdlbmQnLCAnc3RhcnQnLCAnY2VudGVyJ10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENvbHVtbiBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Db2x1bW46IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Sb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBPcHRpb25hbCBpbmxpbmUgc3R5bGUgKi9cbiAgc3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKiBUYWIgaW5kZXggZm9yIGZvY3VzICovXG4gIHRhYkluZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogV2lkdGggb2YgR3JpZDsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIGNvbHVtbnMuXG4gICAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkdyaWQuZGVmYXVsdFByb3BzID0ge1xuICAnYXJpYS1sYWJlbCc6ICdncmlkJyxcbiAgY2VsbFN0eWxlOiB7fSxcbiAgY2VsbFJhbmdlUmVuZGVyZXI6IF9kZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXIyLmRlZmF1bHQsXG4gIGVzdGltYXRlZENvbHVtblNpemU6IDEwMCxcbiAgZXN0aW1hdGVkUm93U2l6ZTogMzAsXG4gIG5vQ29udGVudFJlbmRlcmVyOiBmdW5jdGlvbiBub0NvbnRlbnRSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuQ29sdW1uQ291bnQ6IDAsXG4gIG92ZXJzY2FuUm93Q291bnQ6IDEwLFxuICBzY3JvbGxpbmdSZXNldFRpbWVJbnRlcnZhbDogREVGQVVMVF9TQ1JPTExJTkdfUkVTRVRfVElNRV9JTlRFUlZBTCxcbiAgc2Nyb2xsVG9BbGlnbm1lbnQ6ICdhdXRvJyxcbiAgc3R5bGU6IHt9LFxuICB0YWJJbmRleDogMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEdyaWQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXI7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBjZWxsUmFuZ2VSZW5kZXJlciB1c2VkIGJ5IEdyaWQuXG4gKiBUaGlzIHJlbmRlcmVyIHN1cHBvcnRzIGNlbGwtY2FjaGluZyB3aGlsZSB0aGUgdXNlciBpcyBzY3JvbGxpbmcuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlcihfcmVmKSB7XG4gIHZhciBjZWxsQ2FjaGUgPSBfcmVmLmNlbGxDYWNoZTtcbiAgdmFyIGNlbGxDbGFzc05hbWUgPSBfcmVmLmNlbGxDbGFzc05hbWU7XG4gIHZhciBjZWxsUmVuZGVyZXIgPSBfcmVmLmNlbGxSZW5kZXJlcjtcbiAgdmFyIGNlbGxTdHlsZSA9IF9yZWYuY2VsbFN0eWxlO1xuICB2YXIgY29sdW1uU2l6ZUFuZFBvc2l0aW9uTWFuYWdlciA9IF9yZWYuY29sdW1uU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjtcbiAgdmFyIGNvbHVtblN0YXJ0SW5kZXggPSBfcmVmLmNvbHVtblN0YXJ0SW5kZXg7XG4gIHZhciBjb2x1bW5TdG9wSW5kZXggPSBfcmVmLmNvbHVtblN0b3BJbmRleDtcbiAgdmFyIGhvcml6b250YWxPZmZzZXRBZGp1c3RtZW50ID0gX3JlZi5ob3Jpem9udGFsT2Zmc2V0QWRqdXN0bWVudDtcbiAgdmFyIGlzU2Nyb2xsaW5nID0gX3JlZi5pc1Njcm9sbGluZztcbiAgdmFyIHJvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSBfcmVmLnJvd1NpemVBbmRQb3NpdGlvbk1hbmFnZXI7XG4gIHZhciByb3dTdGFydEluZGV4ID0gX3JlZi5yb3dTdGFydEluZGV4O1xuICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZi5yb3dTdG9wSW5kZXg7XG4gIHZhciBzY3JvbGxMZWZ0ID0gX3JlZi5zY3JvbGxMZWZ0O1xuICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gIHZhciB2ZXJ0aWNhbE9mZnNldEFkanVzdG1lbnQgPSBfcmVmLnZlcnRpY2FsT2Zmc2V0QWRqdXN0bWVudDtcblxuICB2YXIgcmVuZGVyZWRDZWxscyA9IFtdO1xuXG4gIGZvciAodmFyIHJvd0luZGV4ID0gcm93U3RhcnRJbmRleDsgcm93SW5kZXggPD0gcm93U3RvcEluZGV4OyByb3dJbmRleCsrKSB7XG4gICAgdmFyIHJvd0RhdHVtID0gcm93U2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRTaXplQW5kUG9zaXRpb25PZkNlbGwocm93SW5kZXgpO1xuXG4gICAgZm9yICh2YXIgY29sdW1uSW5kZXggPSBjb2x1bW5TdGFydEluZGV4OyBjb2x1bW5JbmRleCA8PSBjb2x1bW5TdG9wSW5kZXg7IGNvbHVtbkluZGV4KyspIHtcbiAgICAgIHZhciBjb2x1bW5EYXR1bSA9IGNvbHVtblNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZDZWxsKGNvbHVtbkluZGV4KTtcbiAgICAgIHZhciBrZXkgPSByb3dJbmRleCArICctJyArIGNvbHVtbkluZGV4O1xuICAgICAgdmFyIGNlbGxTdHlsZU9iamVjdCA9IGNlbGxTdHlsZSh7IHJvd0luZGV4OiByb3dJbmRleCwgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4IH0pO1xuICAgICAgdmFyIHJlbmRlcmVkQ2VsbCA9IHZvaWQgMDtcblxuICAgICAgLy8gQXZvaWQgcmUtY3JlYXRpbmcgY2VsbHMgd2hpbGUgc2Nyb2xsaW5nLlxuICAgICAgLy8gVGhpcyBjYW4gbGVhZCB0byB0aGUgc2FtZSBjZWxsIGJlaW5nIGNyZWF0ZWQgbWFueSB0aW1lcyBhbmQgY2FuIGNhdXNlIHBlcmZvcm1hbmNlIGlzc3VlcyBmb3IgXCJoZWF2eVwiIGNlbGxzLlxuICAgICAgLy8gSWYgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MtIGNhY2hlIGFuZCByZXVzZSBjZWxscy5cbiAgICAgIC8vIFRoaXMgY2FjaGUgd2lsbCBiZSB0aHJvd24gYXdheSBvbmNlIHNjcm9sbGluZyBjb21wbGV0cy5cbiAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICBpZiAoIWNlbGxDYWNoZVtrZXldKSB7XG4gICAgICAgICAgY2VsbENhY2hlW2tleV0gPSBjZWxsUmVuZGVyZXIoe1xuICAgICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nLFxuICAgICAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyZWRDZWxsID0gY2VsbENhY2hlW2tleV07XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIGlzIG5vIGxvbmdlciBzY3JvbGxpbmcsIGRvbid0IGNhY2hlIGNlbGxzLlxuICAgICAgICAvLyBUaGlzIG1ha2VzIGR5bmFtaWMgY2VsbCBjb250ZW50IGRpZmZpY3VsdCBmb3IgdXNlcnMgYW5kIHdvdWxkIGFsc28gbGVhZCB0byBhIGhlYXZpZXIgbWVtb3J5IGZvb3RwcmludC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVkQ2VsbCA9IGNlbGxSZW5kZXJlcih7XG4gICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBpc1Njcm9sbGluZyxcbiAgICAgICAgICByb3dJbmRleDogcm93SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZW5kZXJlZENlbGwgPT0gbnVsbCB8fCByZW5kZXJlZENlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2xhc3NOYW1lID0gY2VsbENsYXNzTmFtZSh7IGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCwgcm93SW5kZXg6IHJvd0luZGV4IH0pO1xuXG4gICAgICB2YXIgY2hpbGQgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0dyaWRfX2NlbGwnLCBjbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7XG4gICAgICAgICAgICBoZWlnaHQ6IHJvd0RhdHVtLnNpemUsXG4gICAgICAgICAgICBsZWZ0OiBjb2x1bW5EYXR1bS5vZmZzZXQgKyBob3Jpem9udGFsT2Zmc2V0QWRqdXN0bWVudCxcbiAgICAgICAgICAgIHRvcDogcm93RGF0dW0ub2Zmc2V0ICsgdmVydGljYWxPZmZzZXRBZGp1c3RtZW50LFxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbkRhdHVtLnNpemVcbiAgICAgICAgICB9LCBjZWxsU3R5bGVPYmplY3QpXG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICAgKTtcblxuICAgICAgcmVuZGVyZWRDZWxscy5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVuZGVyZWRDZWxscztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlciA9IGV4cG9ydHMuR3JpZCA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9HcmlkMiA9IHJlcXVpcmUoJy4vR3JpZCcpO1xuXG52YXIgX0dyaWQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZDIpO1xuXG52YXIgX2RlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlcjIgPSByZXF1aXJlKCcuL2RlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlcicpO1xuXG52YXIgX2RlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0dyaWQzLmRlZmF1bHQ7XG5leHBvcnRzLkdyaWQgPSBfR3JpZDMuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdENlbGxSYW5nZVJlbmRlcmVyID0gX2RlZmF1bHRDZWxsUmFuZ2VSZW5kZXJlcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSnVzdC1pbi10aW1lIGNhbGN1bGF0ZXMgYW5kIGNhY2hlcyBzaXplIGFuZCBwb3NpdGlvbiBpbmZvcm1hdGlvbiBmb3IgYSBjb2xsZWN0aW9uIG9mIGNlbGxzLlxuICovXG52YXIgQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyKF9yZWYpIHtcbiAgICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gICAgdmFyIGNlbGxTaXplR2V0dGVyID0gX3JlZi5jZWxsU2l6ZUdldHRlcjtcbiAgICB2YXIgZXN0aW1hdGVkQ2VsbFNpemUgPSBfcmVmLmVzdGltYXRlZENlbGxTaXplO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyKTtcblxuICAgIHRoaXMuX2NlbGxTaXplR2V0dGVyID0gY2VsbFNpemVHZXR0ZXI7XG4gICAgdGhpcy5fY2VsbENvdW50ID0gY2VsbENvdW50O1xuICAgIHRoaXMuX2VzdGltYXRlZENlbGxTaXplID0gZXN0aW1hdGVkQ2VsbFNpemU7XG5cbiAgICAvLyBDYWNoZSBvZiBzaXplIGFuZCBwb3NpdGlvbiBkYXRhIGZvciBjZWxscywgbWFwcGVkIGJ5IGNlbGwgaW5kZXguXG4gICAgLy8gTm90ZSB0aGF0IGludmFsaWQgdmFsdWVzIG1heSBleGlzdCBpbiB0aGlzIG1hcCBzbyBvbmx5IHJlbHkgb24gY2VsbHMgdXAgdG8gdGhpcy5fbGFzdE1lYXN1cmVkSW5kZXhcbiAgICB0aGlzLl9jZWxsU2l6ZUFuZFBvc2l0aW9uRGF0YSA9IHt9O1xuXG4gICAgLy8gTWVhc3VyZW1lbnRzIGZvciBjZWxscyB1cCB0byB0aGlzIGluZGV4IGNhbiBiZSB0cnVzdGVkOyBjZWxscyBhZnRlcndhcmQgc2hvdWxkIGJlIGVzdGltYXRlZC5cbiAgICB0aGlzLl9sYXN0TWVhc3VyZWRJbmRleCA9IC0xO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLCBbe1xuICAgIGtleTogJ2NvbmZpZ3VyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbmZpZ3VyZShfcmVmMikge1xuICAgICAgdmFyIGNlbGxDb3VudCA9IF9yZWYyLmNlbGxDb3VudDtcbiAgICAgIHZhciBlc3RpbWF0ZWRDZWxsU2l6ZSA9IF9yZWYyLmVzdGltYXRlZENlbGxTaXplO1xuXG4gICAgICB0aGlzLl9jZWxsQ291bnQgPSBjZWxsQ291bnQ7XG4gICAgICB0aGlzLl9lc3RpbWF0ZWRDZWxsU2l6ZSA9IGVzdGltYXRlZENlbGxTaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldENlbGxDb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxDb3VudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jZWxsQ291bnQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0RXN0aW1hdGVkQ2VsbFNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRDZWxsU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lc3RpbWF0ZWRDZWxsU2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRMYXN0TWVhc3VyZWRJbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldExhc3RNZWFzdXJlZEluZGV4KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3RNZWFzdXJlZEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIHNpemUgYW5kIHBvc2l0aW9uIGZvciB0aGUgY2VsbCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqIEl0IGp1c3QtaW4tdGltZSBjYWxjdWxhdGVzIChvciB1c2VkIGNhY2hlZCB2YWx1ZXMpIGZvciBjZWxscyBsZWFkaW5nIHVwIHRvIHRoZSBpbmRleC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZDZWxsKGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX2NlbGxDb3VudCkge1xuICAgICAgICB0aHJvdyBFcnJvcignUmVxdWVzdGVkIGluZGV4ICcgKyBpbmRleCArICcgaXMgb3V0c2lkZSBvZiByYW5nZSAwLi4nICsgdGhpcy5fY2VsbENvdW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ID4gdGhpcy5fbGFzdE1lYXN1cmVkSW5kZXgpIHtcbiAgICAgICAgdmFyIGxhc3RNZWFzdXJlZENlbGxTaXplQW5kUG9zaXRpb24gPSB0aGlzLmdldFNpemVBbmRQb3NpdGlvbk9mTGFzdE1lYXN1cmVkQ2VsbCgpO1xuICAgICAgICB2YXIgX29mZnNldCA9IGxhc3RNZWFzdXJlZENlbGxTaXplQW5kUG9zaXRpb24ub2Zmc2V0ICsgbGFzdE1lYXN1cmVkQ2VsbFNpemVBbmRQb3NpdGlvbi5zaXplO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLl9sYXN0TWVhc3VyZWRJbmRleCArIDE7IGkgPD0gaW5kZXg7IGkrKykge1xuICAgICAgICAgIHZhciBfc2l6ZSA9IHRoaXMuX2NlbGxTaXplR2V0dGVyKHsgaW5kZXg6IGkgfSk7XG5cbiAgICAgICAgICBpZiAoX3NpemUgPT0gbnVsbCB8fCBpc05hTihfc2l6ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIHNpemUgcmV0dXJuZWQgZm9yIGNlbGwgJyArIGkgKyAnIG9mIHZhbHVlICcgKyBfc2l6ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY2VsbFNpemVBbmRQb3NpdGlvbkRhdGFbaV0gPSB7XG4gICAgICAgICAgICBvZmZzZXQ6IF9vZmZzZXQsXG4gICAgICAgICAgICBzaXplOiBfc2l6ZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBfb2Zmc2V0ICs9IF9zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdE1lYXN1cmVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25EYXRhW2luZGV4XTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRTaXplQW5kUG9zaXRpb25PZkxhc3RNZWFzdXJlZENlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplQW5kUG9zaXRpb25PZkxhc3RNZWFzdXJlZENlbGwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdE1lYXN1cmVkSW5kZXggPj0gMCA/IHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25EYXRhW3RoaXMuX2xhc3RNZWFzdXJlZEluZGV4XSA6IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvdGFsIHNpemUgb2YgYWxsIGNlbGxzIGJlaW5nIG1lYXN1cmVkLlxuICAgICAqIFRoaXMgdmFsdWUgd2lsbCBiZSBjb21wbGV0ZWRseSBlc3RpbWF0ZWQgaW5pdGlhbGx5LlxuICAgICAqIEFzIGNlbGxzIGFzIG1lYXN1cmVkIHRoZSBlc3RpbWF0ZSB3aWxsIGJlIHVwZGF0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFRvdGFsU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvdGFsU2l6ZSgpIHtcbiAgICAgIHZhciBsYXN0TWVhc3VyZWRDZWxsU2l6ZUFuZFBvc2l0aW9uID0gdGhpcy5nZXRTaXplQW5kUG9zaXRpb25PZkxhc3RNZWFzdXJlZENlbGwoKTtcblxuICAgICAgcmV0dXJuIGxhc3RNZWFzdXJlZENlbGxTaXplQW5kUG9zaXRpb24ub2Zmc2V0ICsgbGFzdE1lYXN1cmVkQ2VsbFNpemVBbmRQb3NpdGlvbi5zaXplICsgKHRoaXMuX2NlbGxDb3VudCAtIHRoaXMuX2xhc3RNZWFzdXJlZEluZGV4IC0gMSkgKiB0aGlzLl9lc3RpbWF0ZWRDZWxsU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGEgbmV3IG9mZnNldCB0aGF0IGVuc3VyZXMgYSBjZXJ0YWluIGNlbGwgaXMgdmlzaWJsZSwgZ2l2ZW4gdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICAgICAqIElmIHRoZSBjZWxsIGlzIGFscmVhZHkgdmlzaWJsZSB0aGVuIHRoZSBjdXJyZW50IG9mZnNldCB3aWxsIGJlIHJldHVybmVkLlxuICAgICAqIElmIHRoZSBjdXJyZW50IG9mZnNldCBpcyB0b28gZ3JlYXQgb3Igc21hbGwsIGl0IHdpbGwgYmUgYWRqdXN0ZWQganVzdCBlbm91Z2ggdG8gZW5zdXJlIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbGlnbiBEZXNpcmVkIGFsaWdubWVudCB3aXRoaW4gY29udGFpbmVyOyBvbmUgb2YgXCJhdXRvXCIgKGRlZmF1bHQpLCBcInN0YXJ0XCIsIG9yIFwiZW5kXCJcbiAgICAgKiBAcGFyYW0gY29udGFpbmVyU2l6ZSBTaXplICh3aWR0aCBvciBoZWlnaHQpIG9mIHRoZSBjb250YWluZXIgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gY3VycmVudE9mZnNldCBDb250YWluZXIncyBjdXJyZW50ICh4IG9yIHkpIG9mZnNldFxuICAgICAqIEBwYXJhbSB0b3RhbFNpemUgVG90YWwgc2l6ZSAod2lkdGggb3IgaGVpZ2h0KSBvZiBhbGwgY2VsbHNcbiAgICAgKiBAcmV0dXJuIE9mZnNldCB0byB1c2UgdG8gZW5zdXJlIHRoZSBzcGVjaWZpZWQgY2VsbCBpcyB2aXNpYmxlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleChfcmVmMykge1xuICAgICAgdmFyIF9yZWYzJGFsaWduID0gX3JlZjMuYWxpZ247XG4gICAgICB2YXIgYWxpZ24gPSBfcmVmMyRhbGlnbiA9PT0gdW5kZWZpbmVkID8gJ2F1dG8nIDogX3JlZjMkYWxpZ247XG4gICAgICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWYzLmNvbnRhaW5lclNpemU7XG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IF9yZWYzLmN1cnJlbnRPZmZzZXQ7XG4gICAgICB2YXIgdGFyZ2V0SW5kZXggPSBfcmVmMy50YXJnZXRJbmRleDtcblxuICAgICAgdmFyIGRhdHVtID0gdGhpcy5nZXRTaXplQW5kUG9zaXRpb25PZkNlbGwodGFyZ2V0SW5kZXgpO1xuICAgICAgdmFyIG1heE9mZnNldCA9IGRhdHVtLm9mZnNldDtcbiAgICAgIHZhciBtaW5PZmZzZXQgPSBtYXhPZmZzZXQgLSBjb250YWluZXJTaXplICsgZGF0dW0uc2l6ZTtcblxuICAgICAgdmFyIGlkZWFsT2Zmc2V0ID0gdm9pZCAwO1xuXG4gICAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgICBpZGVhbE9mZnNldCA9IG1heE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICBpZGVhbE9mZnNldCA9IG1pbk9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICBpZGVhbE9mZnNldCA9IG1heE9mZnNldCAtIChjb250YWluZXJTaXplIC0gZGF0dW0uc2l6ZSkgLyAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlkZWFsT2Zmc2V0ID0gTWF0aC5tYXgobWluT2Zmc2V0LCBNYXRoLm1pbihtYXhPZmZzZXQsIGN1cnJlbnRPZmZzZXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIHRvdGFsU2l6ZSA9IHRoaXMuZ2V0VG90YWxTaXplKCk7XG5cbiAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbFNpemUgLSBjb250YWluZXJTaXplLCBpZGVhbE9mZnNldCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFZpc2libGVDZWxsUmFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWaXNpYmxlQ2VsbFJhbmdlKF9yZWY0KSB7XG4gICAgICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWY0LmNvbnRhaW5lclNpemU7XG4gICAgICB2YXIgb2Zmc2V0ID0gX3JlZjQub2Zmc2V0O1xuXG4gICAgICB2YXIgdG90YWxTaXplID0gdGhpcy5nZXRUb3RhbFNpemUoKTtcblxuICAgICAgaWYgKHRvdGFsU2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXhPZmZzZXQgPSBvZmZzZXQgKyBjb250YWluZXJTaXplO1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5fZmluZE5lYXJlc3RDZWxsKG9mZnNldCk7XG5cbiAgICAgIHZhciBkYXR1bSA9IHRoaXMuZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZDZWxsKHN0YXJ0KTtcbiAgICAgIG9mZnNldCA9IGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG5cbiAgICAgIHZhciBzdG9wID0gc3RhcnQ7XG5cbiAgICAgIHdoaWxlIChvZmZzZXQgPCBtYXhPZmZzZXQgJiYgc3RvcCA8IHRoaXMuX2NlbGxDb3VudCAtIDEpIHtcbiAgICAgICAgc3RvcCsrO1xuXG4gICAgICAgIG9mZnNldCArPSB0aGlzLmdldFNpemVBbmRQb3NpdGlvbk9mQ2VsbChzdG9wKS5zaXplO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIHN0b3A6IHN0b3BcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIGNhY2hlZCB2YWx1ZXMgZm9yIGNlbGxzIGFmdGVyIHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCBmb3IgYW55IGNlbGwgdGhhdCBoYXMgY2hhbmdlZCBpdHMgc2l6ZS5cbiAgICAgKiBJdCB3aWxsIG5vdCBpbW1lZGlhdGVseSBwZXJmb3JtIGFueSBjYWxjdWxhdGlvbnM7IHRoZXknbGwgYmUgcGVyZm9ybWVkIHRoZSBuZXh0IHRpbWUgZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZDZWxsKCkgaXMgY2FsbGVkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZXNldENlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldENlbGwoaW5kZXgpIHtcbiAgICAgIHRoaXMuX2xhc3RNZWFzdXJlZEluZGV4ID0gTWF0aC5taW4odGhpcy5fbGFzdE1lYXN1cmVkSW5kZXgsIGluZGV4IC0gMSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2JpbmFyeVNlYXJjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9iaW5hcnlTZWFyY2goX3JlZjUpIHtcbiAgICAgIHZhciBoaWdoID0gX3JlZjUuaGlnaDtcbiAgICAgIHZhciBsb3cgPSBfcmVmNS5sb3c7XG4gICAgICB2YXIgb2Zmc2V0ID0gX3JlZjUub2Zmc2V0O1xuXG4gICAgICB2YXIgbWlkZGxlID0gdm9pZCAwO1xuICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB2b2lkIDA7XG5cbiAgICAgIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgICAgICBtaWRkbGUgPSBsb3cgKyBNYXRoLmZsb29yKChoaWdoIC0gbG93KSAvIDIpO1xuICAgICAgICBjdXJyZW50T2Zmc2V0ID0gdGhpcy5nZXRTaXplQW5kUG9zaXRpb25PZkNlbGwobWlkZGxlKS5vZmZzZXQ7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRPZmZzZXQgPT09IG9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBtaWRkbGU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA8IG9mZnNldCkge1xuICAgICAgICAgIGxvdyA9IG1pZGRsZSArIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA+IG9mZnNldCkge1xuICAgICAgICAgIGhpZ2ggPSBtaWRkbGUgLSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChsb3cgPiAwKSB7XG4gICAgICAgIHJldHVybiBsb3cgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19leHBvbmVudGlhbFNlYXJjaCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9leHBvbmVudGlhbFNlYXJjaChfcmVmNikge1xuICAgICAgdmFyIGluZGV4ID0gX3JlZjYuaW5kZXg7XG4gICAgICB2YXIgb2Zmc2V0ID0gX3JlZjYub2Zmc2V0O1xuXG4gICAgICB2YXIgaW50ZXJ2YWwgPSAxO1xuXG4gICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLl9jZWxsQ291bnQgJiYgdGhpcy5nZXRTaXplQW5kUG9zaXRpb25PZkNlbGwoaW5kZXgpLm9mZnNldCA8IG9mZnNldCkge1xuICAgICAgICBpbmRleCArPSBpbnRlcnZhbDtcbiAgICAgICAgaW50ZXJ2YWwgKj0gMjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNlYXJjaCh7XG4gICAgICAgIGhpZ2g6IE1hdGgubWluKGluZGV4LCB0aGlzLl9jZWxsQ291bnQgLSAxKSxcbiAgICAgICAgbG93OiBNYXRoLmZsb29yKGluZGV4IC8gMiksXG4gICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyBmb3IgdGhlIGNlbGwgKGluZGV4KSBuZWFyZXN0IHRoZSBzcGVjaWZpZWQgb2Zmc2V0LlxuICAgICAqXG4gICAgICogSWYgbm8gZXhhY3QgbWF0Y2ggaXMgZm91bmQgdGhlIG5leHQgbG93ZXN0IGNlbGwgaW5kZXggd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKiBUaGlzIGFsbG93cyBwYXJ0aWFsbHkgdmlzaWJsZSBjZWxscyAod2l0aCBvZmZzZXRzIGp1c3QgYmVmb3JlL2Fib3ZlIHRoZSBmb2xkKSB0byBiZSB2aXNpYmxlLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfZmluZE5lYXJlc3RDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmROZWFyZXN0Q2VsbChvZmZzZXQpIHtcbiAgICAgIGlmIChpc05hTihvZmZzZXQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIG9mZnNldCAnICsgb2Zmc2V0ICsgJyBzcGVjaWZpZWQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3VyIHNlYXJjaCBhbGdvcml0aG1zIGZpbmQgdGhlIG5lYXJlc3QgbWF0Y2ggYXQgb3IgYmVsb3cgdGhlIHNwZWNpZmllZCBvZmZzZXQuXG4gICAgICAvLyBTbyBtYWtlIHN1cmUgdGhlIG9mZnNldCBpcyBhdCBsZWFzdCAwIG9yIG5vIG1hdGNoIHdpbGwgYmUgZm91bmQuXG4gICAgICBvZmZzZXQgPSBNYXRoLm1heCgwLCBvZmZzZXQpO1xuXG4gICAgICB2YXIgbGFzdE1lYXN1cmVkQ2VsbFNpemVBbmRQb3NpdGlvbiA9IHRoaXMuZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZMYXN0TWVhc3VyZWRDZWxsKCk7XG4gICAgICB2YXIgbGFzdE1lYXN1cmVkSW5kZXggPSBNYXRoLm1heCgwLCB0aGlzLl9sYXN0TWVhc3VyZWRJbmRleCk7XG5cbiAgICAgIGlmIChsYXN0TWVhc3VyZWRDZWxsU2l6ZUFuZFBvc2l0aW9uLm9mZnNldCA+PSBvZmZzZXQpIHtcbiAgICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBtZWFzdXJlZCBjZWxscyB3aXRoaW4gdGhpcyByYW5nZSBqdXN0IHVzZSBhIGJpbmFyeSBzZWFyY2ggYXMgaXQncyBmYXN0ZXIuXG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5hcnlTZWFyY2goe1xuICAgICAgICAgIGhpZ2g6IGxhc3RNZWFzdXJlZEluZGV4LFxuICAgICAgICAgIGxvdzogMCxcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgeWV0IG1lYXN1cmVkIHRoaXMgaGlnaCwgZmFsbGJhY2sgdG8gYW4gZXhwb25lbnRpYWwgc2VhcmNoIHdpdGggYW4gaW5uZXIgYmluYXJ5IHNlYXJjaC5cbiAgICAgICAgLy8gVGhlIGV4cG9uZW50aWFsIHNlYXJjaCBhdm9pZHMgcHJlLWNvbXB1dGluZyBzaXplcyBmb3IgdGhlIGZ1bGwgc2V0IG9mIGNlbGxzIGFzIGEgYmluYXJ5IHNlYXJjaCB3b3VsZC5cbiAgICAgICAgLy8gVGhlIG92ZXJhbGwgY29tcGxleGl0eSBmb3IgdGhpcyBhcHByb2FjaCBpcyBPKGxvZyBuKS5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cG9uZW50aWFsU2VhcmNoKHtcbiAgICAgICAgICBpbmRleDogbGFzdE1lYXN1cmVkSW5kZXgsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkRFRkFVTFRfTUFYX1NDUk9MTF9TSVpFID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX0NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi9DZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcicpO1xuXG52YXIgX0NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEJyb3dzZXJzIGhhdmUgc2Nyb2xsIG9mZnNldCBsaW1pdGF0aW9ucyAoZWcgQ2hyb21lIHN0b3BzIHNjcm9sbGluZyBhdCB+MzMuNU0gcGl4ZWxzIHdoZXJlIGFzIEVkZ2UgdG9wcyBvdXQgYXQgfjEuNU0gcGl4ZWxzKS5cbiAqIEFmdGVyIGEgY2VydGFpbiBwb3NpdGlvbiwgdGhlIGJyb3dzZXIgd29uJ3QgYWxsb3cgdGhlIHVzZXIgdG8gc2Nyb2xsIGZ1cnRoZXIgKGV2ZW4gdmlhIEphdmFTY3JpcHQgc2Nyb2xsIG9mZnNldCBhZGp1c3RtZW50cykuXG4gKiBUaGlzIHV0aWwgcGlja3MgYSBsb3dlciBjZWlsaW5nIGZvciBtYXggc2l6ZSBhbmQgYXJ0aWZpY2lhbGx5IGFkanVzdHMgcG9zaXRpb25zIHdpdGhpbiB0byBtYWtlIGl0IHRyYW5zcGFyZW50IGZvciB1c2Vycy5cbiAqL1xudmFyIERFRkFVTFRfTUFYX1NDUk9MTF9TSVpFID0gZXhwb3J0cy5ERUZBVUxUX01BWF9TQ1JPTExfU0laRSA9IDE1MDAwMDA7XG5cbi8qKlxuICogRXh0ZW5kcyBDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlciBhbmQgYWRkcyBzY2FsaW5nIGJlaGF2aW9yIGZvciBsaXN0cyB0aGF0IGFyZSB0b28gbGFyZ2UgdG8gZml0IHdpdGhpbiBhIGJyb3dzZXIncyBuYXRpdmUgbGltaXRzLlxuICovXG5cbnZhciBTY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcihfcmVmKSB7XG4gICAgdmFyIF9yZWYkbWF4U2Nyb2xsU2l6ZSA9IF9yZWYubWF4U2Nyb2xsU2l6ZTtcbiAgICB2YXIgbWF4U2Nyb2xsU2l6ZSA9IF9yZWYkbWF4U2Nyb2xsU2l6ZSA9PT0gdW5kZWZpbmVkID8gREVGQVVMVF9NQVhfU0NST0xMX1NJWkUgOiBfcmVmJG1heFNjcm9sbFNpemU7XG5cbiAgICB2YXIgcGFyYW1zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnbWF4U2Nyb2xsU2l6ZSddKTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIpO1xuXG4gICAgLy8gRmF2b3IgY29tcG9zaXRpb24gb3ZlciBpbmhlcml0YW5jZSB0byBzaW1wbGlmeSBJRTEwIHN1cHBvcnRcbiAgICB0aGlzLl9jZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlciA9IG5ldyBfQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIyLmRlZmF1bHQocGFyYW1zKTtcbiAgICB0aGlzLl9tYXhTY3JvbGxTaXplID0gbWF4U2Nyb2xsU2l6ZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIsIFt7XG4gICAga2V5OiAnY29uZmlndXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29uZmlndXJlKHBhcmFtcykge1xuICAgICAgdGhpcy5fY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIuY29uZmlndXJlKHBhcmFtcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2VsbENvdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbENvdW50KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldENlbGxDb3VudCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEVzdGltYXRlZENlbGxTaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RXN0aW1hdGVkQ2VsbFNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0RXN0aW1hdGVkQ2VsbFNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdnZXRMYXN0TWVhc3VyZWRJbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldExhc3RNZWFzdXJlZEluZGV4KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldExhc3RNZWFzdXJlZEluZGV4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHBpeGVscyBhIGNlbGwgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIChvZmZzZXQpIHNob3VsZCBiZSBzaGlmdGVkIGluIG9yZGVyIHRvIGZpdCB3aXRoaW4gdGhlIHNjYWxlZCBjb250YWluZXIuXG4gICAgICogVGhlIG9mZnNldCBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBpcyBzY2FsbGVkIChzYWZlKSBhcyB3ZWxsLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRPZmZzZXRBZGp1c3RtZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T2Zmc2V0QWRqdXN0bWVudChfcmVmMikge1xuICAgICAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmMi5jb250YWluZXJTaXplO1xuICAgICAgdmFyIG9mZnNldCA9IF9yZWYyLm9mZnNldDtcblxuICAgICAgdmFyIHRvdGFsU2l6ZSA9IHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuICAgICAgdmFyIHNhZmVUb3RhbFNpemUgPSB0aGlzLmdldFRvdGFsU2l6ZSgpO1xuICAgICAgdmFyIG9mZnNldFBlcmNlbnRhZ2UgPSB0aGlzLl9nZXRPZmZzZXRQZXJjZW50YWdlKHtcbiAgICAgICAgY29udGFpbmVyU2l6ZTogY29udGFpbmVyU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgIHRvdGFsU2l6ZTogc2FmZVRvdGFsU2l6ZVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKG9mZnNldFBlcmNlbnRhZ2UgKiAoc2FmZVRvdGFsU2l6ZSAtIHRvdGFsU2l6ZSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFNpemVBbmRQb3NpdGlvbk9mQ2VsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNpemVBbmRQb3NpdGlvbk9mQ2VsbChpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFNpemVBbmRQb3NpdGlvbk9mQ2VsbChpbmRleCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZMYXN0TWVhc3VyZWRDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2l6ZUFuZFBvc2l0aW9uT2ZMYXN0TWVhc3VyZWRDZWxsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFNpemVBbmRQb3NpdGlvbk9mTGFzdE1lYXN1cmVkQ2VsbCgpO1xuICAgIH1cblxuICAgIC8qKiBTZWUgQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIjZ2V0VG90YWxTaXplICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFRvdGFsU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvdGFsU2l6ZSgpIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLl9tYXhTY3JvbGxTaXplLCB0aGlzLl9jZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRUb3RhbFNpemUoKSk7XG4gICAgfVxuXG4gICAgLyoqIFNlZSBDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlciNnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXggKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KF9yZWYzKSB7XG4gICAgICB2YXIgX3JlZjMkYWxpZ24gPSBfcmVmMy5hbGlnbjtcbiAgICAgIHZhciBhbGlnbiA9IF9yZWYzJGFsaWduID09PSB1bmRlZmluZWQgPyAnYXV0bycgOiBfcmVmMyRhbGlnbjtcbiAgICAgIHZhciBjb250YWluZXJTaXplID0gX3JlZjMuY29udGFpbmVyU2l6ZTtcbiAgICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gX3JlZjMuY3VycmVudE9mZnNldDtcbiAgICAgIHZhciB0YXJnZXRJbmRleCA9IF9yZWYzLnRhcmdldEluZGV4O1xuICAgICAgdmFyIHRvdGFsU2l6ZSA9IF9yZWYzLnRvdGFsU2l6ZTtcblxuICAgICAgY3VycmVudE9mZnNldCA9IHRoaXMuX3NhZmVPZmZzZXRUb09mZnNldCh7XG4gICAgICAgIGNvbnRhaW5lclNpemU6IGNvbnRhaW5lclNpemUsXG4gICAgICAgIG9mZnNldDogY3VycmVudE9mZnNldFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9jZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgoe1xuICAgICAgICBhbGlnbjogYWxpZ24sXG4gICAgICAgIGNvbnRhaW5lclNpemU6IGNvbnRhaW5lclNpemUsXG4gICAgICAgIGN1cnJlbnRPZmZzZXQ6IGN1cnJlbnRPZmZzZXQsXG4gICAgICAgIHRhcmdldEluZGV4OiB0YXJnZXRJbmRleCxcbiAgICAgICAgdG90YWxTaXplOiB0b3RhbFNpemVcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0VG9TYWZlT2Zmc2V0KHtcbiAgICAgICAgY29udGFpbmVyU2l6ZTogY29udGFpbmVyU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBTZWUgQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIjZ2V0VmlzaWJsZUNlbGxSYW5nZSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRWaXNpYmxlQ2VsbFJhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmlzaWJsZUNlbGxSYW5nZShfcmVmNCkge1xuICAgICAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmNC5jb250YWluZXJTaXplO1xuICAgICAgdmFyIG9mZnNldCA9IF9yZWY0Lm9mZnNldDtcblxuICAgICAgb2Zmc2V0ID0gdGhpcy5fc2FmZU9mZnNldFRvT2Zmc2V0KHtcbiAgICAgICAgY29udGFpbmVyU2l6ZTogY29udGFpbmVyU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5fY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0VmlzaWJsZUNlbGxSYW5nZSh7XG4gICAgICAgIGNvbnRhaW5lclNpemU6IGNvbnRhaW5lclNpemUsXG4gICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZXNldENlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNldENlbGwoaW5kZXgpIHtcbiAgICAgIHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLnJlc2V0Q2VsbChpbmRleCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldE9mZnNldFBlcmNlbnRhZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0T2Zmc2V0UGVyY2VudGFnZShfcmVmNSkge1xuICAgICAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmNS5jb250YWluZXJTaXplO1xuICAgICAgdmFyIG9mZnNldCA9IF9yZWY1Lm9mZnNldDtcbiAgICAgIHZhciB0b3RhbFNpemUgPSBfcmVmNS50b3RhbFNpemU7XG5cbiAgICAgIHJldHVybiB0b3RhbFNpemUgPD0gY29udGFpbmVyU2l6ZSA/IDAgOiBvZmZzZXQgLyAodG90YWxTaXplIC0gY29udGFpbmVyU2l6ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29mZnNldFRvU2FmZU9mZnNldCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vZmZzZXRUb1NhZmVPZmZzZXQoX3JlZjYpIHtcbiAgICAgIHZhciBjb250YWluZXJTaXplID0gX3JlZjYuY29udGFpbmVyU2l6ZTtcbiAgICAgIHZhciBvZmZzZXQgPSBfcmVmNi5vZmZzZXQ7XG5cbiAgICAgIHZhciB0b3RhbFNpemUgPSB0aGlzLl9jZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRUb3RhbFNpemUoKTtcbiAgICAgIHZhciBzYWZlVG90YWxTaXplID0gdGhpcy5nZXRUb3RhbFNpemUoKTtcblxuICAgICAgaWYgKHRvdGFsU2l6ZSA9PT0gc2FmZVRvdGFsU2l6ZSkge1xuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG9mZnNldFBlcmNlbnRhZ2UgPSB0aGlzLl9nZXRPZmZzZXRQZXJjZW50YWdlKHtcbiAgICAgICAgICBjb250YWluZXJTaXplOiBjb250YWluZXJTaXplLFxuICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgIHRvdGFsU2l6ZTogdG90YWxTaXplXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG9mZnNldFBlcmNlbnRhZ2UgKiAoc2FmZVRvdGFsU2l6ZSAtIGNvbnRhaW5lclNpemUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2FmZU9mZnNldFRvT2Zmc2V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NhZmVPZmZzZXRUb09mZnNldChfcmVmNykge1xuICAgICAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmNy5jb250YWluZXJTaXplO1xuICAgICAgdmFyIG9mZnNldCA9IF9yZWY3Lm9mZnNldDtcblxuICAgICAgdmFyIHRvdGFsU2l6ZSA9IHRoaXMuX2NlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuICAgICAgdmFyIHNhZmVUb3RhbFNpemUgPSB0aGlzLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICBpZiAodG90YWxTaXplID09PSBzYWZlVG90YWxTaXplKSB7XG4gICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb2Zmc2V0UGVyY2VudGFnZSA9IHRoaXMuX2dldE9mZnNldFBlcmNlbnRhZ2Uoe1xuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGNvbnRhaW5lclNpemUsXG4gICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgdG90YWxTaXplOiBzYWZlVG90YWxTaXplXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG9mZnNldFBlcmNlbnRhZ2UgKiAodG90YWxTaXplIC0gY29udGFpbmVyU2l6ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTY2FsaW5nQ2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNjYWxpbmdDZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0O1xuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRoYXQgZGV0ZXJtaW5lcyB3aGVuIHRvIHJlY2FsY3VsYXRlIHJvdyBvciBjb2x1bW4gbWV0YWRhdGEuXG4gKlxuICogQHBhcmFtIGNlbGxDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgTWV0aG9kIHRvIGludm9rZSBpZiBjZWxsIG1ldGFkYXRhIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzIFBhcmFtZXRlcnMgdG8gcGFzcyB0byA6Y29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tcbiAqIEBwYXJhbSBuZXh0Q2VsbHNDb3VudCBOZXdseSB1cGRhdGVkIG51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG5leHRDZWxsc1NpemUgTmV3bHkgdXBkYXRlZCB3aWR0aCBvciBoZWlnaHQgb2YgY2VsbHMgZm9yIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBuZXh0U2Nyb2xsVG9JbmRleCBOZXdseSB1cGRhdGVkIHNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHNjcm9sbFRvSW5kZXggU2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCBDYWxsYmFjayB0byBpbnZva2UgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbiBzaG91bGQgYmUgcmVjYWxjdWxhdGVkXG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBjZWxsU2l6ZSA9IF9yZWYuY2VsbFNpemU7XG4gIHZhciBjb21wdXRlTWV0YWRhdGFDYWxsYmFjayA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s7XG4gIHZhciBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzID0gX3JlZi5jb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzO1xuICB2YXIgbmV4dENlbGxzQ291bnQgPSBfcmVmLm5leHRDZWxsc0NvdW50O1xuICB2YXIgbmV4dENlbGxTaXplID0gX3JlZi5uZXh0Q2VsbFNpemU7XG4gIHZhciBuZXh0U2Nyb2xsVG9JbmRleCA9IF9yZWYubmV4dFNjcm9sbFRvSW5kZXg7XG4gIHZhciBzY3JvbGxUb0luZGV4ID0gX3JlZi5zY3JvbGxUb0luZGV4O1xuICB2YXIgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCA9IF9yZWYudXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDtcblxuICAvLyBEb24ndCBjb21wYXJlIGNlbGwgc2l6ZXMgaWYgdGhleSBhcmUgZnVuY3Rpb25zIGJlY2F1c2UgaW5saW5lIGZ1bmN0aW9ucyB3b3VsZCBjYXVzZSBpbmZpbml0ZSBsb29wcy5cbiAgLy8gSW4gdGhhdCBldmVudCB1c2VycyBzaG91bGQgdXNlIHRoZSBtYW51YWwgcmVjb21wdXRlIG1ldGhvZHMgdG8gaW5mb3JtIG9mIGNoYW5nZXMuXG4gIGlmIChjZWxsQ291bnQgIT09IG5leHRDZWxsc0NvdW50IHx8ICh0eXBlb2YgY2VsbFNpemUgPT09ICdudW1iZXInIHx8IHR5cGVvZiBuZXh0Q2VsbFNpemUgPT09ICdudW1iZXInKSAmJiBjZWxsU2l6ZSAhPT0gbmV4dENlbGxTaXplKSB7XG4gICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2soY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyk7XG5cbiAgICAvLyBVcGRhdGVkIGNlbGwgbWV0YWRhdGEgbWF5IGhhdmUgaGlkZGVuIHRoZSBwcmV2aW91cyBzY3JvbGxlZC10byBpdGVtLlxuICAgIC8vIEluIHRoaXMgY2FzZSB3ZSBzaG91bGQgYWxzbyB1cGRhdGUgdGhlIHNjcm9sbFRvcCB0byBlbnN1cmUgaXQgc3RheXMgdmlzaWJsZS5cbiAgICBpZiAoc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPT09IG5leHRTY3JvbGxUb0luZGV4KSB7XG4gICAgICB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4KCk7XG4gICAgfVxuICB9XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPdmVyc2NhbkluZGljZXM7XG52YXIgU0NST0xMX0RJUkVDVElPTl9CQUNLV0FSRCA9IGV4cG9ydHMuU0NST0xMX0RJUkVDVElPTl9CQUNLV0FSRCA9IC0xO1xudmFyIFNDUk9MTF9ESVJFQ1RJT05fRklYRUQgPSBleHBvcnRzLlNDUk9MTF9ESVJFQ1RJT05fRklYRUQgPSAwO1xudmFyIFNDUk9MTF9ESVJFQ1RJT05fRk9SV0FSRCA9IGV4cG9ydHMuU0NST0xMX0RJUkVDVElPTl9GT1JXQVJEID0gMTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgY2VsbHMgdG8gb3ZlcnNjYW4gYmVmb3JlIGFuZCBhZnRlciBhIHNwZWNpZmllZCByYW5nZS5cbiAqIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IG92ZXJzY2FubmluZyBkb2Vzbid0IGV4Y2VlZCB0aGUgYXZhaWxhYmxlIGNlbGxzLlxuICpcbiAqIEBwYXJhbSBjZWxsQ291bnQgTnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gc2Nyb2xsRGlyZWN0aW9uIE9uZSBvZiBTQ1JPTExfRElSRUNUSU9OX0JBQ0tXQVJEXG4gKiBAcGFyYW0gb3ZlcnNjYW5DZWxsc0NvdW50IE1heGltdW0gbnVtYmVyIG9mIGNlbGxzIHRvIG92ZXItcmVuZGVyIGluIGVpdGhlciBkaXJlY3Rpb25cbiAqIEBwYXJhbSBzdGFydEluZGV4IEJlZ2luIG9mIHJhbmdlIG9mIHZpc2libGUgY2VsbHNcbiAqIEBwYXJhbSBzdG9wSW5kZXggRW5kIG9mIHJhbmdlIG9mIHZpc2libGUgY2VsbHNcbiAqL1xuZnVuY3Rpb24gZ2V0T3ZlcnNjYW5JbmRpY2VzKF9yZWYpIHtcbiAgdmFyIGNlbGxDb3VudCA9IF9yZWYuY2VsbENvdW50O1xuICB2YXIgb3ZlcnNjYW5DZWxsc0NvdW50ID0gX3JlZi5vdmVyc2NhbkNlbGxzQ291bnQ7XG4gIHZhciBzY3JvbGxEaXJlY3Rpb24gPSBfcmVmLnNjcm9sbERpcmVjdGlvbjtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmLnN0YXJ0SW5kZXg7XG4gIHZhciBzdG9wSW5kZXggPSBfcmVmLnN0b3BJbmRleDtcblxuICB2YXIgb3ZlcnNjYW5TdGFydEluZGV4ID0gdm9pZCAwO1xuICB2YXIgb3ZlcnNjYW5TdG9wSW5kZXggPSB2b2lkIDA7XG5cbiAgaWYgKHNjcm9sbERpcmVjdGlvbiA9PT0gU0NST0xMX0RJUkVDVElPTl9GT1JXQVJEKSB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4ID0gc3RhcnRJbmRleDtcbiAgICBvdmVyc2NhblN0b3BJbmRleCA9IHN0b3BJbmRleCArIG92ZXJzY2FuQ2VsbHNDb3VudCAqIDI7XG4gIH0gZWxzZSBpZiAoc2Nyb2xsRGlyZWN0aW9uID09PSBTQ1JPTExfRElSRUNUSU9OX0JBQ0tXQVJEKSB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4ID0gc3RhcnRJbmRleCAtIG92ZXJzY2FuQ2VsbHNDb3VudCAqIDI7XG4gICAgb3ZlcnNjYW5TdG9wSW5kZXggPSBzdG9wSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4ID0gc3RhcnRJbmRleCAtIG92ZXJzY2FuQ2VsbHNDb3VudDtcbiAgICBvdmVyc2NhblN0b3BJbmRleCA9IHN0b3BJbmRleCArIG92ZXJzY2FuQ2VsbHNDb3VudDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4OiBNYXRoLm1heCgwLCBvdmVyc2NhblN0YXJ0SW5kZXgpLFxuICAgIG92ZXJzY2FuU3RvcEluZGV4OiBNYXRoLm1pbihjZWxsQ291bnQgLSAxLCBvdmVyc2NhblN0b3BJbmRleClcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB1cGRhdGVTY3JvbGxJbmRleEhlbHBlcjtcbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGVuIHRvIHVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyB0byBlbnN1cmUgdGhhdCBhIHNjcm9sbC10by1pbmRleCByZW1haW5zIHZpc2libGUuXG4gKiBUaGlzIGZ1bmN0aW9uIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBzY3JvbGwgb2ZzZXQgaXNuJ3QgcGFzdCB0aGUgbGFzdCBjb2x1bW4vcm93IG9mIGNlbGxzLlxuICpcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIgTWFuYWdlcyBzaXplIGFuZCBwb3NpdGlvbiBtZXRhZGF0YSBvZiBjZWxsc1xuICogQHBhcmFtIHByZXZpb3VzQ2VsbHNDb3VudCBQcmV2aW91cyBudW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zXG4gKiBAcGFyYW0gcHJldmlvdXNDZWxsc1NpemUgUHJldmlvdXMgd2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzXG4gKiBAcGFyYW0gcHJldmlvdXNTY3JvbGxUb0luZGV4IFByZXZpb3VzIHNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHByZXZpb3VzU2l6ZSBQcmV2aW91cyB3aWR0aCBvciBoZWlnaHQgb2YgdGhlIHZpcnR1YWxpemVkIGNvbnRhaW5lclxuICogQHBhcmFtIHNjcm9sbE9mZnNldCBDdXJyZW50IHNjcm9sbExlZnQgb3Igc2Nyb2xsVG9wXG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBzaXplIFdpZHRoIG9yIGhlaWdodCBvZiB0aGUgdmlydHVhbGl6ZWQgY29udGFpbmVyXG4gKiBAcGFyYW0gdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBhbiBzY3JvbGwtdG8taW5kZXggdmFsdWVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIoX3JlZikge1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIgPSBfcmVmLmNlbGxTaXplQW5kUG9zaXRpb25NYW5hZ2VyO1xuICB2YXIgcHJldmlvdXNDZWxsc0NvdW50ID0gX3JlZi5wcmV2aW91c0NlbGxzQ291bnQ7XG4gIHZhciBwcmV2aW91c0NlbGxTaXplID0gX3JlZi5wcmV2aW91c0NlbGxTaXplO1xuICB2YXIgcHJldmlvdXNTY3JvbGxUb0FsaWdubWVudCA9IF9yZWYucHJldmlvdXNTY3JvbGxUb0FsaWdubWVudDtcbiAgdmFyIHByZXZpb3VzU2Nyb2xsVG9JbmRleCA9IF9yZWYucHJldmlvdXNTY3JvbGxUb0luZGV4O1xuICB2YXIgcHJldmlvdXNTaXplID0gX3JlZi5wcmV2aW91c1NpemU7XG4gIHZhciBzY3JvbGxPZmZzZXQgPSBfcmVmLnNjcm9sbE9mZnNldDtcbiAgdmFyIHNjcm9sbFRvQWxpZ25tZW50ID0gX3JlZi5zY3JvbGxUb0FsaWdubWVudDtcbiAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcmVmLnNjcm9sbFRvSW5kZXg7XG4gIHZhciBzaXplID0gX3JlZi5zaXplO1xuICB2YXIgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayA9IF9yZWYudXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjaztcblxuICB2YXIgY2VsbENvdW50ID0gY2VsbFNpemVBbmRQb3NpdGlvbk1hbmFnZXIuZ2V0Q2VsbENvdW50KCk7XG4gIHZhciBoYXNTY3JvbGxUb0luZGV4ID0gc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPCBjZWxsQ291bnQ7XG4gIHZhciBzaXplSGFzQ2hhbmdlZCA9IHNpemUgIT09IHByZXZpb3VzU2l6ZSB8fCAhcHJldmlvdXNDZWxsU2l6ZSB8fCB0eXBlb2YgY2VsbFNpemUgPT09ICdudW1iZXInICYmIGNlbGxTaXplICE9PSBwcmV2aW91c0NlbGxTaXplO1xuXG4gIC8vIElmIHdlIGhhdmUgYSBuZXcgc2Nyb2xsIHRhcmdldCBPUiBpZiBoZWlnaHQvcm93LWhlaWdodCBoYXMgY2hhbmdlZCxcbiAgLy8gV2Ugc2hvdWxkIGVuc3VyZSB0aGF0IHRoZSBzY3JvbGwgdGFyZ2V0IGlzIHZpc2libGUuXG4gIGlmIChoYXNTY3JvbGxUb0luZGV4ICYmIChzaXplSGFzQ2hhbmdlZCB8fCBzY3JvbGxUb0FsaWdubWVudCAhPT0gcHJldmlvdXNTY3JvbGxUb0FsaWdubWVudCB8fCBzY3JvbGxUb0luZGV4ICE9PSBwcmV2aW91c1Njcm9sbFRvSW5kZXgpKSB7XG4gICAgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayhzY3JvbGxUb0luZGV4KTtcblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBzZWxlY3RlZCBpdGVtIGJ1dCBsaXN0IHNpemUgb3IgbnVtYmVyIG9mIGNoaWxkcmVuIGhhdmUgZGVjcmVhc2VkLFxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBhcmVuJ3Qgc2Nyb2xsZWQgdG9vIGZhciBwYXN0IHRoZSBjdXJyZW50IGNvbnRlbnQuXG4gIH0gZWxzZSBpZiAoIWhhc1Njcm9sbFRvSW5kZXggJiYgY2VsbENvdW50ID4gMCAmJiAoc2l6ZSA8IHByZXZpb3VzU2l6ZSB8fCBjZWxsQ291bnQgPCBwcmV2aW91c0NlbGxzQ291bnQpKSB7XG4gICAgLy8gV2UgbmVlZCB0byBlbnN1cmUgdGhhdCB0aGUgY3VycmVudCBzY3JvbGwgb2Zmc2V0IGlzIHN0aWxsIHdpdGhpbiB0aGUgY29sbGVjdGlvbidzIHJhbmdlLlxuICAgIC8vIFRvIGRvIHRoaXMsIHdlIGRvbid0IG5lZWQgdG8gbWVhc3VyZSBldmVyeXRoaW5nOyBDZWxsTWVhc3VyZXIgd291bGQgcGVyZm9ybSBwb29ybHkuXG4gICAgLy8gSnVzdCBjaGVjayB0byBtYWtlIHN1cmUgd2UncmUgc3RpbGwgb2theS5cbiAgICAvLyBPbmx5IGFkanVzdCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGlmIHdlJ3ZlIHNjcm9sbGVkIGJlbG93IHRoZSBsYXN0IHNldCBvZiByb3dzLlxuICAgIGlmIChzY3JvbGxPZmZzZXQgPiBjZWxsU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5nZXRUb3RhbFNpemUoKSAtIHNpemUpIHtcbiAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soY2VsbENvdW50IC0gMSk7XG4gICAgfVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5leHBvcnRzLmlzUmFuZ2VWaXNpYmxlID0gaXNSYW5nZVZpc2libGU7XG5leHBvcnRzLnNjYW5Gb3JVbmxvYWRlZFJhbmdlcyA9IHNjYW5Gb3JVbmxvYWRlZFJhbmdlcztcbmV4cG9ydHMuZm9yY2VVcGRhdGVSZWFjdFZpcnR1YWxpemVkQ29tcG9uZW50ID0gZm9yY2VVcGRhdGVSZWFjdFZpcnR1YWxpemVkQ29tcG9uZW50O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplciA9IHJlcXVpcmUoJy4uL3V0aWxzL2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXInKTtcblxudmFyIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0aGF0IG1hbmFnZXMgbGF6eS1sb2FkaW5nIGZvciBcImluZmluaXRlXCIgZGF0YS5cbiAqIFRoaXMgY29tcG9uZW50IGRlY29yYXRlcyBhIHZpcnR1YWwgY29tcG9uZW50IGFuZCBqdXN0LWluLXRpbWUgcHJlZmV0Y2hlcyByb3dzIGFzIGEgdXNlciBzY3JvbGxzLlxuICogSXQgaXMgaW50ZW5kZWQgYXMgYSBjb252ZW5pZW5jZSBjb21wb25lbnQ7IGZvcmsgaXQgaWYgeW91J2QgbGlrZSBmaW5lci1ncmFpbmVkIGNvbnRyb2wgb3ZlciBkYXRhLWxvYWRpbmcuXG4gKi9cbnZhciBJbmZpbml0ZUxvYWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhJbmZpbml0ZUxvYWRlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5maW5pdGVMb2FkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW5maW5pdGVMb2FkZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEluZmluaXRlTG9hZGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW5maW5pdGVMb2FkZXIpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fbG9hZE1vcmVSb3dzTWVtb2l6ZXIgPSAoMCwgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIyLmRlZmF1bHQpKCk7XG5cbiAgICBfdGhpcy5fb25Sb3dzUmVuZGVyZWQgPSBfdGhpcy5fb25Sb3dzUmVuZGVyZWQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3JlZ2lzdGVyQ2hpbGQgPSBfdGhpcy5fcmVnaXN0ZXJDaGlsZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSW5maW5pdGVMb2FkZXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuXG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICBvblJvd3NSZW5kZXJlZDogdGhpcy5fb25Sb3dzUmVuZGVyZWQsXG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQ6IHRoaXMuX3JlZ2lzdGVyQ2hpbGRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19sb2FkVW5sb2FkZWRSYW5nZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfbG9hZFVubG9hZGVkUmFuZ2VzKHVubG9hZGVkUmFuZ2VzKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGxvYWRNb3JlUm93cyA9IHRoaXMucHJvcHMubG9hZE1vcmVSb3dzO1xuXG5cbiAgICAgIHVubG9hZGVkUmFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKHVubG9hZGVkUmFuZ2UpIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSBsb2FkTW9yZVJvd3ModW5sb2FkZWRSYW5nZSk7XG4gICAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHZpc2libGUgcm93cyBpZiBhbnkgb2YgdGhlbSBoYXZlIGp1c3QgYmVlbiBsb2FkZWQuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhleSB3aWxsIHJlbWFpbiBpbiB0aGVpciB1bmxvYWRlZCB2aXN1YWwgc3RhdGUuXG4gICAgICAgICAgICBpZiAoaXNSYW5nZVZpc2libGUoe1xuICAgICAgICAgICAgICBsYXN0UmVuZGVyZWRTdGFydEluZGV4OiBfdGhpczIuX2xhc3RSZW5kZXJlZFN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIGxhc3RSZW5kZXJlZFN0b3BJbmRleDogX3RoaXMyLl9sYXN0UmVuZGVyZWRTdG9wSW5kZXgsXG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHVubG9hZGVkUmFuZ2Uuc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgc3RvcEluZGV4OiB1bmxvYWRlZFJhbmdlLnN0b3BJbmRleFxuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzMi5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGVSZWFjdFZpcnR1YWxpemVkQ29tcG9uZW50KF90aGlzMi5fcmVnaXN0ZXJlZENoaWxkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Sb3dzUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Sb3dzUmVuZGVyZWQoX3JlZikge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGFydEluZGV4ID0gX3JlZi5zdGFydEluZGV4O1xuICAgICAgdmFyIHN0b3BJbmRleCA9IF9yZWYuc3RvcEluZGV4O1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaXNSb3dMb2FkZWQgPSBfcHJvcHMuaXNSb3dMb2FkZWQ7XG4gICAgICB2YXIgbWluaW11bUJhdGNoU2l6ZSA9IF9wcm9wcy5taW5pbXVtQmF0Y2hTaXplO1xuICAgICAgdmFyIHJvd0NvdW50ID0gX3Byb3BzLnJvd0NvdW50O1xuICAgICAgdmFyIHRocmVzaG9sZCA9IF9wcm9wcy50aHJlc2hvbGQ7XG5cblxuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9sYXN0UmVuZGVyZWRTdG9wSW5kZXggPSBzdG9wSW5kZXg7XG5cbiAgICAgIHZhciB1bmxvYWRlZFJhbmdlcyA9IHNjYW5Gb3JVbmxvYWRlZFJhbmdlcyh7XG4gICAgICAgIGlzUm93TG9hZGVkOiBpc1Jvd0xvYWRlZCxcbiAgICAgICAgbWluaW11bUJhdGNoU2l6ZTogbWluaW11bUJhdGNoU2l6ZSxcbiAgICAgICAgcm93Q291bnQ6IHJvd0NvdW50LFxuICAgICAgICBzdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gdGhyZXNob2xkKSxcbiAgICAgICAgc3RvcEluZGV4OiBNYXRoLm1pbihyb3dDb3VudCAtIDEsIHN0b3BJbmRleCArIHRocmVzaG9sZClcbiAgICAgIH0pO1xuXG4gICAgICAvLyBGb3IgbWVtb2l6ZSBjb21wYXJpc29uXG4gICAgICB2YXIgc3F1YXNoZWRVbmxvYWRlZFJhbmdlcyA9IHVubG9hZGVkUmFuZ2VzLnJlZHVjZShmdW5jdGlvbiAocmVkdWNlZCwgdW5sb2FkZWRSYW5nZSkge1xuICAgICAgICByZXR1cm4gcmVkdWNlZC5jb25jYXQoW3VubG9hZGVkUmFuZ2Uuc3RhcnRJbmRleCwgdW5sb2FkZWRSYW5nZS5zdG9wSW5kZXhdKTtcbiAgICAgIH0sIFtdKTtcblxuICAgICAgdGhpcy5fbG9hZE1vcmVSb3dzTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgICAgICAgX3RoaXMzLl9sb2FkVW5sb2FkZWRSYW5nZXModW5sb2FkZWRSYW5nZXMpO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiB7IHNxdWFzaGVkVW5sb2FkZWRSYW5nZXM6IHNxdWFzaGVkVW5sb2FkZWRSYW5nZXMgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChyZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCA9IHJlZ2lzdGVyZWRDaGlsZDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSW5maW5pdGVMb2FkZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIHNwZWNpZmllZCBzdGFydC9zdG9wIHJhbmdlIGlzIHZpc2libGUgYmFzZWQgb24gdGhlIG1vc3QgcmVjZW50bHkgcmVuZGVyZWQgcmFuZ2UuXG4gKi9cblxuXG5JbmZpbml0ZUxvYWRlci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGEgdmlydHVhbGl6ZWQgY29tcG9uZW50LlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IG9uUm93c1JlbmRlcmVkLCByZWdpc3RlckNoaWxkIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgOm9uUm93c1JlbmRlcmVkIGZ1bmN0aW9uIHNob3VsZCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQncyA6b25Sb3dzUmVuZGVyZWQgcHJvcGVydHkuXG4gICAqIFRoZSA6cmVnaXN0ZXJDaGlsZCBjYWxsYmFjayBzaG91bGQgYmUgc2V0IGFzIHRoZSB2aXJ0dWFsaXplZCBjb21wb25lbnQncyA6cmVmLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgdHJhY2tpbmcgdGhlIGxvYWRlZCBzdGF0ZSBvZiBlYWNoIHJvdy5cbiAgICogSXQgc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTogKHsgaW5kZXg6IG51bWJlciB9KTogYm9vbGVhblxuICAgKi9cbiAgaXNSb3dMb2FkZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gbW9yZSByb3dzIG11c3QgYmUgbG9hZGVkLlxuICAgKiBJdCBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IFByb21pc2VcbiAgICogVGhlIHJldHVybmVkIFByb21pc2Ugc2hvdWxkIGJlIHJlc29sdmVkIG9uY2Ugcm93IGRhdGEgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAqIEl0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hlbiB0byByZWZyZXNoIHRoZSBsaXN0IHdpdGggdGhlIG5ld2x5LWxvYWRlZCBkYXRhLlxuICAgKiBUaGlzIGNhbGxiYWNrIG1heSBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gcmVhY3Rpb24gdG8gYSBzaW5nbGUgc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgbG9hZE1vcmVSb3dzOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTWluaW11bSBudW1iZXIgb2Ygcm93cyB0byBiZSBsb2FkZWQgYXQgYSB0aW1lLlxuICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIGJhdGNoIHJlcXVlc3RzIHRvIHJlZHVjZSBIVFRQIHJlcXVlc3RzLlxuICAgKi9cbiAgbWluaW11bUJhdGNoU2l6ZTogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdDsgY2FuIGJlIGFyYml0cmFyeSBoaWdoIG51bWJlciBpZiBhY3R1YWwgbnVtYmVyIGlzIHVua25vd24uXG4gICAqL1xuICByb3dDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogVGhyZXNob2xkIGF0IHdoaWNoIHRvIHByZS1mZXRjaCBkYXRhLlxuICAgKiBBIHRocmVzaG9sZCBYIG1lYW5zIHRoYXQgZGF0YSB3aWxsIHN0YXJ0IGxvYWRpbmcgd2hlbiBhIHVzZXIgc2Nyb2xscyB3aXRoaW4gWCByb3dzLlxuICAgKiBUaGlzIHZhbHVlIGRlZmF1bHRzIHRvIDE1LlxuICAgKi9cbiAgdGhyZXNob2xkOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuSW5maW5pdGVMb2FkZXIuZGVmYXVsdFByb3BzID0ge1xuICBtaW5pbXVtQmF0Y2hTaXplOiAxMCxcbiAgcm93Q291bnQ6IDAsXG4gIHRocmVzaG9sZDogMTVcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBJbmZpbml0ZUxvYWRlcjtcbmZ1bmN0aW9uIGlzUmFuZ2VWaXNpYmxlKF9yZWYyKSB7XG4gIHZhciBsYXN0UmVuZGVyZWRTdGFydEluZGV4ID0gX3JlZjIubGFzdFJlbmRlcmVkU3RhcnRJbmRleDtcbiAgdmFyIGxhc3RSZW5kZXJlZFN0b3BJbmRleCA9IF9yZWYyLmxhc3RSZW5kZXJlZFN0b3BJbmRleDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmMi5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjIuc3RvcEluZGV4O1xuXG4gIHJldHVybiAhKHN0YXJ0SW5kZXggPiBsYXN0UmVuZGVyZWRTdG9wSW5kZXggfHwgc3RvcEluZGV4IDwgbGFzdFJlbmRlcmVkU3RhcnRJbmRleCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgb2YgdGhlIHJhbmdlcyB3aXRoaW4gYSBsYXJnZXIgcmFuZ2UgdGhhdCBjb250YWluIHVubG9hZGVkIHJvd3MuXG4gKi9cbmZ1bmN0aW9uIHNjYW5Gb3JVbmxvYWRlZFJhbmdlcyhfcmVmMykge1xuICB2YXIgaXNSb3dMb2FkZWQgPSBfcmVmMy5pc1Jvd0xvYWRlZDtcbiAgdmFyIG1pbmltdW1CYXRjaFNpemUgPSBfcmVmMy5taW5pbXVtQmF0Y2hTaXplO1xuICB2YXIgcm93Q291bnQgPSBfcmVmMy5yb3dDb3VudDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmMy5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjMuc3RvcEluZGV4O1xuXG4gIHZhciB1bmxvYWRlZFJhbmdlcyA9IFtdO1xuXG4gIHZhciByYW5nZVN0YXJ0SW5kZXggPSBudWxsO1xuICB2YXIgcmFuZ2VTdG9wSW5kZXggPSBudWxsO1xuXG4gIGZvciAodmFyIGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPD0gc3RvcEluZGV4OyBpbmRleCsrKSB7XG4gICAgdmFyIGxvYWRlZCA9IGlzUm93TG9hZGVkKHsgaW5kZXg6IGluZGV4IH0pO1xuXG4gICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgIHJhbmdlU3RvcEluZGV4ID0gaW5kZXg7XG4gICAgICBpZiAocmFuZ2VTdGFydEluZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHJhbmdlU3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmFuZ2VTdG9wSW5kZXggIT09IG51bGwpIHtcbiAgICAgIHVubG9hZGVkUmFuZ2VzLnB1c2goe1xuICAgICAgICBzdGFydEluZGV4OiByYW5nZVN0YXJ0SW5kZXgsXG4gICAgICAgIHN0b3BJbmRleDogcmFuZ2VTdG9wSW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICByYW5nZVN0YXJ0SW5kZXggPSByYW5nZVN0b3BJbmRleCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgOnJhbmdlU3RvcEluZGV4IGlzIG5vdCBudWxsIGl0IG1lYW5zIHdlIGhhdmVuJ3QgcmFuIG91dCBvZiB1bmxvYWRlZCByb3dzLlxuICAvLyBTY2FuIGZvcndhcmQgdG8gdHJ5IGZpbGxpbmcgb3VyIDptaW5pbXVtQmF0Y2hTaXplLlxuICBpZiAocmFuZ2VTdG9wSW5kZXggIT09IG51bGwpIHtcbiAgICB2YXIgcG90ZW50aWFsU3RvcEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgocmFuZ2VTdG9wSW5kZXgsIHJhbmdlU3RhcnRJbmRleCArIG1pbmltdW1CYXRjaFNpemUgLSAxKSwgcm93Q291bnQgLSAxKTtcblxuICAgIGZvciAodmFyIF9pbmRleCA9IHJhbmdlU3RvcEluZGV4ICsgMTsgX2luZGV4IDw9IHBvdGVudGlhbFN0b3BJbmRleDsgX2luZGV4KyspIHtcbiAgICAgIGlmICghaXNSb3dMb2FkZWQoeyBpbmRleDogX2luZGV4IH0pKSB7XG4gICAgICAgIHJhbmdlU3RvcEluZGV4ID0gX2luZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdW5sb2FkZWRSYW5nZXMucHVzaCh7XG4gICAgICBzdGFydEluZGV4OiByYW5nZVN0YXJ0SW5kZXgsXG4gICAgICBzdG9wSW5kZXg6IHJhbmdlU3RvcEluZGV4XG4gICAgfSk7XG4gIH1cblxuICAvLyBDaGVjayB0byBzZWUgaWYgb3VyIGZpcnN0IHJhbmdlIGVuZGVkIHByZW1hdHVyZWx5LlxuICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIHNjYW4gYmFja3dhcmRzIHRvIHRyeSBmaWxsaW5nIG91ciA6bWluaW11bUJhdGNoU2l6ZS5cbiAgaWYgKHVubG9hZGVkUmFuZ2VzLmxlbmd0aCkge1xuICAgIHZhciBmaXJzdFVubG9hZGVkUmFuZ2UgPSB1bmxvYWRlZFJhbmdlc1swXTtcblxuICAgIHdoaWxlIChmaXJzdFVubG9hZGVkUmFuZ2Uuc3RvcEluZGV4IC0gZmlyc3RVbmxvYWRlZFJhbmdlLnN0YXJ0SW5kZXggKyAxIDwgbWluaW11bUJhdGNoU2l6ZSAmJiBmaXJzdFVubG9hZGVkUmFuZ2Uuc3RhcnRJbmRleCA+IDApIHtcbiAgICAgIHZhciBfaW5kZXgyID0gZmlyc3RVbmxvYWRlZFJhbmdlLnN0YXJ0SW5kZXggLSAxO1xuXG4gICAgICBpZiAoIWlzUm93TG9hZGVkKHsgaW5kZXg6IF9pbmRleDIgfSkpIHtcbiAgICAgICAgZmlyc3RVbmxvYWRlZFJhbmdlLnN0YXJ0SW5kZXggPSBfaW5kZXgyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVubG9hZGVkUmFuZ2VzO1xufVxuXG4vKipcbiAqIFNpbmNlIFJWIGNvbXBvbmVudHMgdXNlIHNoYWxsb3dDb21wYXJlIHdlIG5lZWQgdG8gZm9yY2UgYSByZW5kZXIgKGV2ZW4gdGhvdWdoIHByb3BzIGhhdmVuJ3QgY2hhbmdlZCkuXG4gKiBIb3dldmVyIEluZmluaXRlTG9hZGVyIG1heSB3cmFwIGEgR3JpZCBvciBpdCBtYXkgd3JhcCBhIEZsZXhUYWJsZSBvciBWaXJ0dWFsU2Nyb2xsLlxuICogSW4gdGhlIGZpcnN0IGNhc2UgdGhlIGJ1aWx0LWluIFJlYWN0IGZvcmNlVXBkYXRlKCkgbWV0aG9kIGlzIHN1ZmZpY2llbnQgdG8gZm9yY2UgYSByZS1yZW5kZXIsXG4gKiBCdXQgaW4gdGhlIGxhdHRlciBjYXNlcyB3ZSBuZWVkIHRvIHVzZSB0aGUgUlYtc3BlY2lmaWMgZm9yY2VVcGRhdGVHcmlkKCkgbWV0aG9kLlxuICogRWxzZSB0aGUgaW5uZXIgR3JpZCB3aWxsIG5vdCBiZSByZS1yZW5kZXJlZCBhbmQgdmlzdWFscyBtYXkgYmUgc3RhbGUuXG4gKi9cbmZ1bmN0aW9uIGZvcmNlVXBkYXRlUmVhY3RWaXJ0dWFsaXplZENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgdHlwZW9mIGNvbXBvbmVudC5mb3JjZVVwZGF0ZUdyaWQgPT09ICdmdW5jdGlvbicgPyBjb21wb25lbnQuZm9yY2VVcGRhdGVHcmlkKCkgOiBjb21wb25lbnQuZm9yY2VVcGRhdGUoKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0luZmluaXRlTG9hZGVyMiA9IHJlcXVpcmUoJy4vSW5maW5pdGVMb2FkZXInKTtcblxudmFyIF9JbmZpbml0ZUxvYWRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmZpbml0ZUxvYWRlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfSW5maW5pdGVMb2FkZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gX0luZmluaXRlTG9hZGVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSE9DIHRoYXQgc2ltcGxpZmllcyB0aGUgcHJvY2VzcyBvZiBzeW5jaHJvbml6aW5nIHNjcm9sbGluZyBiZXR3ZWVuIHR3byBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gKi9cbnZhciBTY3JvbGxTeW5jID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFNjcm9sbFN5bmMsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFNjcm9sbFN5bmMocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2Nyb2xsU3luYyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2Nyb2xsU3luYy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNjcm9sbFN5bmMpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsaWVudEhlaWdodDogMCxcbiAgICAgIGNsaWVudFdpZHRoOiAwLFxuICAgICAgc2Nyb2xsSGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIHNjcm9sbFdpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2Nyb2xsU3luYywgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3N0YXRlLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IF9zdGF0ZS5jbGllbnRXaWR0aDtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfc3RhdGUuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbFdpZHRoID0gX3N0YXRlLnNjcm9sbFdpZHRoO1xuXG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LFxuICAgICAgICBjbGllbnRXaWR0aDogY2xpZW50V2lkdGgsXG4gICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChfcmVmKSB7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBfcmVmLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsV2lkdGggPSBfcmVmLnNjcm9sbFdpZHRoO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIGNsaWVudFdpZHRoOiBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGggfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjcm9sbFN5bmM7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5TY3JvbGxTeW5jLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgMiBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgb25TY3JvbGwsIHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gU2Nyb2xsU3luYzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfU2Nyb2xsU3luYzIgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxudmFyIF9TY3JvbGxTeW5jMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Njcm9sbFN5bmMyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1Njcm9sbFN5bmMzLmRlZmF1bHQ7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBfU2Nyb2xsU3luYzMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEl0IGlzIGluZWZmaWNpZW50IHRvIGNyZWF0ZSBhbmQgbWFuYWdlIGEgbGFyZ2UgbGlzdCBvZiBET00gZWxlbWVudHMgd2l0aGluIGEgc2Nyb2xsaW5nIGNvbnRhaW5lclxuICogaWYgb25seSBhIGZldyBvZiB0aG9zZSBlbGVtZW50cyBhcmUgdmlzaWJsZS4gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIGNvbXBvbmVudCBpcyB0byBpbXByb3ZlXG4gKiBwZXJmb3JtYW5jZSBieSBvbmx5IHJlbmRlcmluZyB0aGUgRE9NIG5vZGVzIHRoYXQgYSB1c2VyIGlzIGFibGUgdG8gc2VlIGJhc2VkIG9uIHRoZWlyIGN1cnJlbnRcbiAqIHNjcm9sbCBwb3NpdGlvbi5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIGEgdmlydHVhbGl6ZWQgbGlzdCBvZiBlbGVtZW50cyB3aXRoIGVpdGhlciBmaXhlZCBvciBkeW5hbWljIGhlaWdodHMuXG4gKi9cbnZhciBWaXJ0dWFsU2Nyb2xsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFZpcnR1YWxTY3JvbGwsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFZpcnR1YWxTY3JvbGwocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlydHVhbFNjcm9sbCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoVmlydHVhbFNjcm9sbC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZpcnR1YWxTY3JvbGwpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fY2VsbFJlbmRlcmVyID0gX3RoaXMuX2NlbGxSZW5kZXJlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY3JlYXRlUm93Q2xhc3NOYW1lR2V0dGVyID0gX3RoaXMuX2NyZWF0ZVJvd0NsYXNzTmFtZUdldHRlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY3JlYXRlUm93U3R5bGVHZXR0ZXIgPSBfdGhpcy5fY3JlYXRlUm93U3R5bGVHZXR0ZXIuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZCA9IF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmlydHVhbFNjcm9sbCwgW3tcbiAgICBrZXk6ICdmb3JjZVVwZGF0ZUdyaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JjZVVwZGF0ZUdyaWQoKSB7XG4gICAgICB0aGlzLkdyaWQuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKiogU2VlIEdyaWQjbWVhc3VyZUFsbENlbGxzICovXG5cbiAgfSwge1xuICAgIGtleTogJ21lYXN1cmVBbGxSb3dzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWVhc3VyZUFsbFJvd3MoKSB7XG4gICAgICB0aGlzLkdyaWQubWVhc3VyZUFsbENlbGxzKCk7XG4gICAgfVxuXG4gICAgLyoqIFNlZSBHcmlkI3JlY29tcHV0ZUdyaWRTaXplICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlY29tcHV0ZVJvd0hlaWdodHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVSb3dIZWlnaHRzKCkge1xuICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gMCA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgdGhpcy5HcmlkLnJlY29tcHV0ZUdyaWRTaXplKHtcbiAgICAgICAgcm93SW5kZXg6IGluZGV4XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGVHcmlkKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgbm9Sb3dzUmVuZGVyZXIgPSBfcHJvcHMubm9Sb3dzUmVuZGVyZXI7XG4gICAgICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9wcm9wcy5zY3JvbGxUb0luZGV4O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuXG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnVmlydHVhbFNjcm9sbCcsIGNsYXNzTmFtZSk7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgYXV0b0NvbnRhaW5lcldpZHRoOiB0cnVlLFxuICAgICAgICBjZWxsUmVuZGVyZXI6IHRoaXMuX2NlbGxSZW5kZXJlcixcbiAgICAgICAgY2VsbENsYXNzTmFtZTogdGhpcy5fY3JlYXRlUm93Q2xhc3NOYW1lR2V0dGVyKCksXG4gICAgICAgIGNlbGxTdHlsZTogdGhpcy5fY3JlYXRlUm93U3R5bGVHZXR0ZXIoKSxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgICBjb2x1bW5XaWR0aDogd2lkdGgsXG4gICAgICAgIGNvbHVtbkNvdW50OiAxLFxuICAgICAgICBub0NvbnRlbnRSZW5kZXJlcjogbm9Sb3dzUmVuZGVyZXIsXG4gICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IHRoaXMuX29uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICByZWY6IGZ1bmN0aW9uIHJlZihfcmVmKSB7XG4gICAgICAgICAgX3RoaXMyLkdyaWQgPSBfcmVmO1xuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9JbmRleFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jZWxsUmVuZGVyZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY2VsbFJlbmRlcmVyKF9yZWYyKSB7XG4gICAgICB2YXIgY29sdW1uSW5kZXggPSBfcmVmMi5jb2x1bW5JbmRleDtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IF9yZWYyLmlzU2Nyb2xsaW5nO1xuICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjIucm93SW5kZXg7XG4gICAgICB2YXIgcm93UmVuZGVyZXIgPSB0aGlzLnByb3BzLnJvd1JlbmRlcmVyO1xuXG5cbiAgICAgIHJldHVybiByb3dSZW5kZXJlcih7XG4gICAgICAgIGluZGV4OiByb3dJbmRleCxcbiAgICAgICAgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlUm93Q2xhc3NOYW1lR2V0dGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZVJvd0NsYXNzTmFtZUdldHRlcigpIHtcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSB0aGlzLnByb3BzLnJvd0NsYXNzTmFtZTtcblxuXG4gICAgICByZXR1cm4gcm93Q2xhc3NOYW1lIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjMucm93SW5kZXg7XG4gICAgICAgIHJldHVybiByb3dDbGFzc05hbWUoeyBpbmRleDogcm93SW5kZXggfSk7XG4gICAgICB9IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcm93Q2xhc3NOYW1lO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlUm93U3R5bGVHZXR0ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlUm93U3R5bGVHZXR0ZXIoKSB7XG4gICAgICB2YXIgcm93U3R5bGUgPSB0aGlzLnByb3BzLnJvd1N0eWxlO1xuXG5cbiAgICAgIHZhciB3cmFwcGVkID0gcm93U3R5bGUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd1N0eWxlIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcm93U3R5bGU7XG4gICAgICB9O1xuXG4gICAgICAvLyBEZWZhdWx0IHdpZHRoIHRvIDEwMCUgdG8gcHJldmVudCBsaXN0IHJvd3MgZnJvbSBmbG93aW5nIHVuZGVyIHRoZSB2ZXJ0aWNhbCBzY3JvbGxiYXJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoX3JlZjQpIHtcbiAgICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjQucm93SW5kZXg7XG4gICAgICAgIHJldHVybiBfZXh0ZW5kcyh7XG4gICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9LCB3cmFwcGVkKHsgaW5kZXg6IHJvd0luZGV4IH0pKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKF9yZWY1KSB7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZjUuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWY1LnNjcm9sbEhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmNS5zY3JvbGxUb3A7XG4gICAgICB2YXIgb25TY3JvbGwgPSB0aGlzLnByb3BzLm9uU2Nyb2xsO1xuXG5cbiAgICAgIG9uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TZWN0aW9uUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TZWN0aW9uUmVuZGVyZWQoX3JlZjYpIHtcbiAgICAgIHZhciByb3dPdmVyc2NhblN0YXJ0SW5kZXggPSBfcmVmNi5yb3dPdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmNi5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjYucm93U3RhcnRJbmRleDtcbiAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmNi5yb3dTdG9wSW5kZXg7XG4gICAgICB2YXIgb25Sb3dzUmVuZGVyZWQgPSB0aGlzLnByb3BzLm9uUm93c1JlbmRlcmVkO1xuXG5cbiAgICAgIG9uUm93c1JlbmRlcmVkKHtcbiAgICAgICAgb3ZlcnNjYW5TdGFydEluZGV4OiByb3dPdmVyc2NhblN0YXJ0SW5kZXgsXG4gICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiByb3dPdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgc3RhcnRJbmRleDogcm93U3RhcnRJbmRleCxcbiAgICAgICAgc3RvcEluZGV4OiByb3dTdG9wSW5kZXhcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBWaXJ0dWFsU2Nyb2xsO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuVmlydHVhbFNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZml4ZWQgaGVpZ2h0IGZyb20gdGhlIHNjcm9sbGluZ0NvbnRhaW5lciBzbyB0aGF0IHRoZSB0b3RhbCBoZWlnaHRcbiAgICogb2Ygcm93cyBjYW4gc3RyZXRjaCB0aGUgd2luZG93LiBJbnRlbmRlZCBmb3IgdXNlIHdpdGggV2luZG93U2Nyb2xsZXJcbiAgICovXG4gIGF1dG9IZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIG5hbWUgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogVXNlZCB0byBlc3RpbWF0ZSB0aGUgdG90YWwgaGVpZ2h0IG9mIGEgVmlydHVhbFNjcm9sbCBiZWZvcmUgYWxsIG9mIGl0cyByb3dzIGhhdmUgYWN0dWFsbHkgYmVlbiBtZWFzdXJlZC5cbiAgICogVGhlIGVzdGltYXRlZCB0b3RhbCBoZWlnaHQgaXMgYWRqdXN0ZWQgYXMgcm93cyBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBlc3RpbWF0ZWRSb3dTaXplOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBIZWlnaHQgY29uc3RyYWludCBmb3IgbGlzdCAoZGV0ZXJtaW5lcyBob3cgbWFueSBhY3R1YWwgcm93cyBhcmUgcmVuZGVyZWQpICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiByb3dzIHdoZW4gcm93Q291bnQgaXMgMCAqL1xuICBub1Jvd3NSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2xpY2Ugb2Ygcm93cyB0aGF0IHdlcmUganVzdCByZW5kZXJlZC5cbiAgICogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblJvd3NSZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiAoeyBpbmRleDogbnVtYmVyIH0pOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSZXNwb25zYmlsZSBmb3IgcmVuZGVyaW5nIGEgcm93IGdpdmVuIGFuIGluZGV4OyAoeyBpbmRleDogbnVtYmVyIH0pOiBub2RlICovXG4gIHJvd1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgY3VzdG9tIENTUyBjbGFzcyBmb3IgaW5kaXZpZHVhbCByb3dzICovXG4gIHJvd0NsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdC4gKi9cbiAgcm93Q291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIGN1c3RvbSBzdHlsZXMgZm9yIGluZGl2aWR1YWwgY2VsbHMgKi9cbiAgcm93U3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSksXG5cbiAgLyoqIFNlZSBHcmlkI3Njcm9sbFRvQWxpZ25tZW50ICovXG4gIHNjcm9sbFRvQWxpZ25tZW50OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnYXV0bycsICdlbmQnLCAnc3RhcnQnLCAnY2VudGVyJ10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KSAqL1xuICBzY3JvbGxUb0luZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogVmVydGljYWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBPcHRpb25hbCBpbmxpbmUgc3R5bGUgKi9cbiAgc3R5bGU6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKiBUYWIgaW5kZXggZm9yIGZvY3VzICovXG4gIHRhYkluZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogV2lkdGggb2YgbGlzdCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblZpcnR1YWxTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBlc3RpbWF0ZWRSb3dTaXplOiAzMCxcbiAgbm9Sb3dzUmVuZGVyZXI6IGZ1bmN0aW9uIG5vUm93c1JlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblJvd3NSZW5kZXJlZDogZnVuY3Rpb24gb25Sb3dzUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb3ZlcnNjYW5Sb3dDb3VudDogMTAsXG4gIHNjcm9sbFRvQWxpZ25tZW50OiAnYXV0bycsXG4gIHN0eWxlOiB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZpcnR1YWxTY3JvbGw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwyID0gcmVxdWlyZSgnLi9WaXJ0dWFsU2Nyb2xsJyk7XG5cbnZhciBfVmlydHVhbFNjcm9sbDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9WaXJ0dWFsU2Nyb2xsMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9WaXJ0dWFsU2Nyb2xsMy5kZWZhdWx0O1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gX1ZpcnR1YWxTY3JvbGwzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX3JhZiA9IHJlcXVpcmUoJ3JhZicpO1xuXG52YXIgX3JhZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYWYpO1xuXG52YXIgX29uU2Nyb2xsID0gcmVxdWlyZSgnLi91dGlscy9vblNjcm9sbCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBXaW5kb3dTY3JvbGxlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhXaW5kb3dTY3JvbGxlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gV2luZG93U2Nyb2xsZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2luZG93U2Nyb2xsZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFdpbmRvd1Njcm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2luZG93U2Nyb2xsZXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICB2YXIgaGVpZ2h0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fb25TY3JvbGxXaW5kb3cgPSBfdGhpcy5fb25TY3JvbGxXaW5kb3cuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uUmVzaXplV2luZG93ID0gX3RoaXMuX29uUmVzaXplV2luZG93LmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheUNhbGxiYWNrID0gX3RoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5Q2FsbGJhY2suYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdpbmRvd1Njcm9sbGVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5zdGF0ZS5oZWlnaHQ7XG5cbiAgICAgIC8vIFN1YnRyYWN0IGRvY3VtZW50RWxlbWVudCB0b3AgdG8gaGFuZGxlIGVkZ2UtY2FzZSB3aGVyZSBhIHVzZXIgaXMgbmF2aWdhdGluZyBiYWNrIChoaXN0b3J5KSBmcm9tIGFuIGFscmVhZHktc2Nyb2xsZWQgYmFnZS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSB0aGUgYm9keSdzIHRvcCBwb3NpdGlvbiB3aWxsIGJlIGEgbmVnYXRpdmUgbnVtYmVyIGFuZCB0aGlzIGVsZW1lbnQncyB0b3Agd2lsbCBiZSBpbmNyZWFzZWQgKGJ5IHRoYXQgYW1vdW50KS5cblxuICAgICAgdGhpcy5fcG9zaXRpb25Gcm9tVG9wID0gX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChoZWlnaHQgIT09IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgKDAsIF9vblNjcm9sbC5yZWdpc3RlclNjcm9sbExpc3RlbmVyKSh0aGlzKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZVdpbmRvdywgZmFsc2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAoMCwgX29uU2Nyb2xsLnVucmVnaXN0ZXJTY3JvbGxMaXN0ZW5lcikodGhpcyk7XG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZVdpbmRvdywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgICAgICBfdGhpczIuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gX3N0YXRlLmlzU2Nyb2xsaW5nO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZS5zY3JvbGxUb3A7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3N0YXRlLmhlaWdodDtcblxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBudWxsLFxuICAgICAgICBjaGlsZHJlbih7XG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheUNhbGxiYWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5Q2FsbGJhY2soKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25SZXNpemVXaW5kb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25SZXNpemVXaW5kb3coZXZlbnQpIHtcbiAgICAgIHZhciBvblJlc2l6ZSA9IHRoaXMucHJvcHMub25SZXNpemU7XG5cblxuICAgICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgaGVpZ2h0OiBoZWlnaHQgfSk7XG5cbiAgICAgIG9uUmVzaXplKHsgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsV2luZG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsV2luZG93KGV2ZW50KSB7XG4gICAgICB2YXIgb25TY3JvbGwgPSB0aGlzLnByb3BzLm9uU2Nyb2xsO1xuXG4gICAgICAvLyBJbiBJRTEwKyBzY3JvbGxZIGlzIHVuZGVmaW5lZCwgc28gd2UgcmVwbGFjZSB0aGF0IHdpdGggdGhlIGxhdHRlclxuXG4gICAgICB2YXIgc2Nyb2xsWSA9ICdzY3JvbGxZJyBpbiB3aW5kb3cgPyB3aW5kb3cuc2Nyb2xsWSA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBzY3JvbGxZIC0gdGhpcy5fcG9zaXRpb25Gcm9tVG9wKTtcblxuICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Njcm9sbGluZykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZShzdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIG9uU2Nyb2xsKHsgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFdpbmRvd1Njcm9sbGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuV2luZG93U2Nyb2xsZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBjaGlsZHJlbi5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBoZWlnaHQsIHNjcm9sbFRvcCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIG9uLXJlc2l6ZTogKHsgaGVpZ2h0IH0pICovXG4gIG9uUmVzaXplOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbi1zY3JvbGw6ICh7IHNjcm9sbFRvcCB9KSAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5XaW5kb3dTY3JvbGxlci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVzaXplOiBmdW5jdGlvbiBvblJlc2l6ZSgpIHt9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFdpbmRvd1Njcm9sbGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSVNfU0NST0xMSU5HX1RJTUVPVVQgPSBleHBvcnRzLldpbmRvd1Njcm9sbGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1dpbmRvd1Njcm9sbGVyMiA9IHJlcXVpcmUoJy4vV2luZG93U2Nyb2xsZXInKTtcblxudmFyIF9XaW5kb3dTY3JvbGxlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9XaW5kb3dTY3JvbGxlcjIpO1xuXG52YXIgX29uU2Nyb2xsID0gcmVxdWlyZSgnLi91dGlscy9vblNjcm9sbCcpO1xuXG52YXIgX29uU2Nyb2xsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29uU2Nyb2xsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1dpbmRvd1Njcm9sbGVyMy5kZWZhdWx0O1xuZXhwb3J0cy5XaW5kb3dTY3JvbGxlciA9IF9XaW5kb3dTY3JvbGxlcjMuZGVmYXVsdDtcbmV4cG9ydHMuSVNfU0NST0xMSU5HX1RJTUVPVVQgPSBfb25TY3JvbGwyLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZWdpc3RlclNjcm9sbExpc3RlbmVyID0gcmVnaXN0ZXJTY3JvbGxMaXN0ZW5lcjtcbmV4cG9ydHMudW5yZWdpc3RlclNjcm9sbExpc3RlbmVyID0gdW5yZWdpc3RlclNjcm9sbExpc3RlbmVyO1xudmFyIG1vdW50ZWRJbnN0YW5jZXMgPSBbXTtcbnZhciBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID0gbnVsbDtcbnZhciBkaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IG51bGw7XG5cbi8qKlxuICogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgbWlsaXNlY29uZHMgZHVyaW5nIHdoaWNoIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBUaGlzIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBzY3JvbGxpbmcgc21vb3RoZXIuXG4gKi9cbnZhciBJU19TQ1JPTExJTkdfVElNRU9VVCA9IGV4cG9ydHMuSVNfU0NST0xMSU5HX1RJTUVPVVQgPSAxNTA7XG5cbmZ1bmN0aW9uIGVuYWJsZVBvaW50ZXJFdmVudHNJZkRpc2FibGVkKCkge1xuICBpZiAoZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICBkaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IG51bGw7XG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xuXG4gICAgb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cyA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXlDYWxsYmFjaygpIHtcbiAgZW5hYmxlUG9pbnRlckV2ZW50c0lmRGlzYWJsZWQoKTtcbiAgbW91bnRlZEluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICByZXR1cm4gY29tcG9uZW50Ll9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheUNhbGxiYWNrKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpIHtcbiAgaWYgKGRpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKSB7XG4gICAgY2xlYXJUaW1lb3V0KGRpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgfVxuXG4gIGRpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkID0gc2V0VGltZW91dChlbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheUNhbGxiYWNrLCBJU19TQ1JPTExJTkdfVElNRU9VVCk7XG59XG5cbmZ1bmN0aW9uIG9uU2Nyb2xsV2luZG93KGV2ZW50KSB7XG4gIGlmIChvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID09IG51bGwpIHtcbiAgICBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID0gZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzO1xuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXG4gICAgZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKTtcbiAgfVxuICBtb3VudGVkSW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQuX29uU2Nyb2xsV2luZG93KGV2ZW50KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyU2Nyb2xsTGlzdGVuZXIoY29tcG9uZW50KSB7XG4gIGlmICghbW91bnRlZEluc3RhbmNlcy5sZW5ndGgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGxXaW5kb3cpO1xuICB9XG4gIG1vdW50ZWRJbnN0YW5jZXMucHVzaChjb21wb25lbnQpO1xufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyU2Nyb2xsTGlzdGVuZXIoY29tcG9uZW50KSB7XG4gIG1vdW50ZWRJbnN0YW5jZXMgPSBtb3VudGVkSW5zdGFuY2VzLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiBjICE9PSBjb21wb25lbnQ7XG4gIH0pO1xuICBpZiAoIW1vdW50ZWRJbnN0YW5jZXMubGVuZ3RoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsV2luZG93KTtcbiAgICBpZiAoZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dChkaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCk7XG4gICAgICBlbmFibGVQb2ludGVyRXZlbnRzSWZEaXNhYmxlZCgpO1xuICAgIH1cbiAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9BcnJvd0tleVN0ZXBwZXIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0Fycm93S2V5U3RlcHBlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BcnJvd0tleVN0ZXBwZXIuQXJyb3dLZXlTdGVwcGVyO1xuICB9XG59KTtcblxudmFyIF9BdXRvU2l6ZXIgPSByZXF1aXJlKCcuL0F1dG9TaXplcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0F1dG9TaXplcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BdXRvU2l6ZXIuQXV0b1NpemVyO1xuICB9XG59KTtcblxudmFyIF9DZWxsTWVhc3VyZXIgPSByZXF1aXJlKCcuL0NlbGxNZWFzdXJlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NlbGxNZWFzdXJlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9DZWxsTWVhc3VyZXIuQ2VsbE1lYXN1cmVyO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZGVmYXVsdENlbGxNZWFzdXJlckNlbGxTaXplQ2FjaGUnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ2VsbE1lYXN1cmVyLmRlZmF1bHRDZWxsU2l6ZUNhY2hlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndW5pZm9ybVNpemVDZWxsTWVhc3VyZXJDZWxsU2l6ZUNhY2hlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NlbGxNZWFzdXJlci5kZWZhdWx0Q2VsbFNpemVDYWNoZTtcbiAgfVxufSk7XG5cbnZhciBfQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4vQ29sbGVjdGlvbicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NvbGxlY3Rpb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uO1xuICB9XG59KTtcblxudmFyIF9Db2x1bW5TaXplciA9IHJlcXVpcmUoJy4vQ29sdW1uU2l6ZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDb2x1bW5TaXplcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Db2x1bW5TaXplci5Db2x1bW5TaXplcjtcbiAgfVxufSk7XG5cbnZhciBfRmxleFRhYmxlID0gcmVxdWlyZSgnLi9GbGV4VGFibGUnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0RmxleFRhYmxlQ2VsbERhdGFHZXR0ZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLmRlZmF1bHRDZWxsRGF0YUdldHRlcjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2RlZmF1bHRGbGV4VGFibGVDZWxsUmVuZGVyZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLmRlZmF1bHRDZWxsUmVuZGVyZXI7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0RmxleFRhYmxlSGVhZGVyUmVuZGVyZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLmRlZmF1bHRIZWFkZXJSZW5kZXJlcjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2RlZmF1bHRGbGV4VGFibGVSb3dSZW5kZXJlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuZGVmYXVsdFJvd1JlbmRlcmVyO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRmxleFRhYmxlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4VGFibGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGbGV4Q29sdW1uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4Q29sdW1uO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydERpcmVjdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuU29ydERpcmVjdGlvbjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRJbmRpY2F0b3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLlNvcnRJbmRpY2F0b3I7XG4gIH1cbn0pO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuL0dyaWQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdkZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfR3JpZC5kZWZhdWx0Q2VsbFJhbmdlUmVuZGVyZXI7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdHcmlkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0dyaWQuR3JpZDtcbiAgfVxufSk7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIgPSByZXF1aXJlKCcuL0luZmluaXRlTG9hZGVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSW5maW5pdGVMb2FkZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSW5maW5pdGVMb2FkZXIuSW5maW5pdGVMb2FkZXI7XG4gIH1cbn0pO1xuXG52YXIgX1Njcm9sbFN5bmMgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTY3JvbGxTeW5jJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1Njcm9sbFN5bmMuU2Nyb2xsU3luYztcbiAgfVxufSk7XG5cbnZhciBfVmlydHVhbFNjcm9sbCA9IHJlcXVpcmUoJy4vVmlydHVhbFNjcm9sbCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1ZpcnR1YWxTY3JvbGwnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVmlydHVhbFNjcm9sbC5WaXJ0dWFsU2Nyb2xsO1xuICB9XG59KTtcblxudmFyIF9XaW5kb3dTY3JvbGxlciA9IHJlcXVpcmUoJy4vV2luZG93U2Nyb2xsZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdXaW5kb3dTY3JvbGxlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9XaW5kb3dTY3JvbGxlci5XaW5kb3dTY3JvbGxlcjtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjtcbi8qKlxuICogSGVscGVyIHV0aWxpdHkgdGhhdCB1cGRhdGVzIHRoZSBzcGVjaWZpZWQgY2FsbGJhY2sgd2hlbmV2ZXIgYW55IG9mIHRoZSBzcGVjaWZpZWQgaW5kaWNlcyBoYXZlIGNoYW5nZWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIoKSB7XG4gIHZhciByZXF1aXJlQWxsS2V5cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGNhY2hlZEluZGljZXMgPSB7fTtcblxuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBfcmVmLmNhbGxiYWNrO1xuICAgIHZhciBpbmRpY2VzID0gX3JlZi5pbmRpY2VzO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhpbmRpY2VzKTtcbiAgICB2YXIgYWxsSW5pdGlhbGl6ZWQgPSAhcmVxdWlyZUFsbEtleXMgfHwga2V5cy5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbmRpY2VzW2tleV07XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdmFsdWUgPj0gMDtcbiAgICB9KTtcbiAgICB2YXIgaW5kZXhDaGFuZ2VkID0ga2V5cy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGNhY2hlZEluZGljZXMpLmxlbmd0aCB8fCBrZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGNhY2hlZFZhbHVlID0gY2FjaGVkSW5kaWNlc1trZXldO1xuICAgICAgdmFyIHZhbHVlID0gaW5kaWNlc1trZXldO1xuXG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBjYWNoZWRWYWx1ZS5qb2luKCcsJykgIT09IHZhbHVlLmpvaW4oJywnKSA6IGNhY2hlZFZhbHVlICE9PSB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGNhY2hlZEluZGljZXMgPSBpbmRpY2VzO1xuXG4gICAgaWYgKGFsbEluaXRpYWxpemVkICYmIGluZGV4Q2hhbmdlZCkge1xuICAgICAgY2FsbGJhY2soaW5kaWNlcyk7XG4gICAgfVxuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDtcbi8qKlxuICogRGV0ZXJtaW5lcyBhIG5ldyBvZmZzZXQgdGhhdCBlbnN1cmVzIGEgY2VydGFpbiBjZWxsIGlzIHZpc2libGUsIGdpdmVuIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIElmIHRoZSBjZWxsIGlzIGFscmVhZHkgdmlzaWJsZSB0aGVuIHRoZSBjdXJyZW50IG9mZnNldCB3aWxsIGJlIHJldHVybmVkLlxuICogSWYgdGhlIGN1cnJlbnQgb2Zmc2V0IGlzIHRvbyBncmVhdCBvciBzbWFsbCwgaXQgd2lsbCBiZSBhZGp1c3RlZCBqdXN0IGVub3VnaCB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBpbmRleCBpcyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBhbGlnbiBEZXNpcmVkIGFsaWdubWVudCB3aXRoaW4gY29udGFpbmVyOyBvbmUgb2YgXCJhdXRvXCIgKGRlZmF1bHQpLCBcInN0YXJ0XCIsIG9yIFwiZW5kXCJcbiAqIEBwYXJhbSBjZWxsT2Zmc2V0IE9mZnNldCAoeCBvciB5KSBwb3NpdGlvbiBmb3IgY2VsbFxuICogQHBhcmFtIGNlbGxTaXplIFNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgY2VsbFxuICogQHBhcmFtIGNvbnRhaW5lclNpemUgVG90YWwgc2l6ZSAod2lkdGggb3IgaGVpZ2h0KSBvZiB0aGUgY29udGFpbmVyXG4gKiBAcGFyYW0gY3VycmVudE9mZnNldCBDb250YWluZXIncyBjdXJyZW50ICh4IG9yIHkpIG9mZnNldFxuICogQHJldHVybiBPZmZzZXQgdG8gdXNlIHRvIGVuc3VyZSB0aGUgc3BlY2lmaWVkIGNlbGwgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgoX3JlZikge1xuICB2YXIgX3JlZiRhbGlnbiA9IF9yZWYuYWxpZ247XG4gIHZhciBhbGlnbiA9IF9yZWYkYWxpZ24gPT09IHVuZGVmaW5lZCA/ICdhdXRvJyA6IF9yZWYkYWxpZ247XG4gIHZhciBjZWxsT2Zmc2V0ID0gX3JlZi5jZWxsT2Zmc2V0O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWYuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmLmN1cnJlbnRPZmZzZXQ7XG5cbiAgdmFyIG1heE9mZnNldCA9IGNlbGxPZmZzZXQ7XG4gIHZhciBtaW5PZmZzZXQgPSBtYXhPZmZzZXQgLSBjb250YWluZXJTaXplICsgY2VsbFNpemU7XG5cbiAgc3dpdGNoIChhbGlnbikge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHJldHVybiBtYXhPZmZzZXQgLSAoY29udGFpbmVyU2l6ZSAtIGNlbGxTaXplKSAvIDI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBNYXRoLm1heChtaW5PZmZzZXQsIE1hdGgubWluKG1heE9mZnNldCwgY3VycmVudE9mZnNldCkpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiogRGV0ZWN0IEVsZW1lbnQgUmVzaXplLlxuKiBGb3JrZWQgaW4gb3JkZXIgdG8gZ3VhcmQgYWdhaW5zdCB1bnNhZmUgJ3dpbmRvdycgYW5kICdkb2N1bWVudCcgcmVmZXJlbmNlcy5cbipcbiogaHR0cHM6Ly9naXRodWIuY29tL3NkZWNpbWEvamF2YXNjcmlwdC1kZXRlY3QtZWxlbWVudC1yZXNpemVcbiogU2ViYXN0aWFuIERlY2ltYVxuKlxuKiB2ZXJzaW9uOiAwLjUuM1xuKiovXG5cbi8vIENoZWNrIGBkb2N1bWVudGAgYW5kIGB3aW5kb3dgIGluIGNhc2Ugb2Ygc2VydmVyLXNpZGUgcmVuZGVyaW5nXG52YXIgX3dpbmRvdztcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICBfd2luZG93ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgX3dpbmRvdyA9IHNlbGY7XG59IGVsc2Uge1xuICBfd2luZG93ID0gdW5kZWZpbmVkO1xufVxuXG52YXIgYXR0YWNoRXZlbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50O1xudmFyIHN0eWxlc0NyZWF0ZWQgPSBmYWxzZTtcblxuaWYgKCFhdHRhY2hFdmVudCkge1xuICB2YXIgcmVxdWVzdEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByYWYgPSBfd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBfd2luZG93LnNldFRpbWVvdXQoZm4sIDIwKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiByYWYoZm4pO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgY2FuY2VsRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbmNlbCA9IF93aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cuY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHJldHVybiBjYW5jZWwoaWQpO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgcmVzZXRUcmlnZ2VycyA9IGZ1bmN0aW9uIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCkge1xuICAgIHZhciB0cmlnZ2VycyA9IGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLFxuICAgICAgICBleHBhbmQgPSB0cmlnZ2Vycy5maXJzdEVsZW1lbnRDaGlsZCxcbiAgICAgICAgY29udHJhY3QgPSB0cmlnZ2Vycy5sYXN0RWxlbWVudENoaWxkLFxuICAgICAgICBleHBhbmRDaGlsZCA9IGV4cGFuZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb250cmFjdC5zY3JvbGxMZWZ0ID0gY29udHJhY3Quc2Nyb2xsV2lkdGg7XG4gICAgY29udHJhY3Quc2Nyb2xsVG9wID0gY29udHJhY3Quc2Nyb2xsSGVpZ2h0O1xuICAgIGV4cGFuZENoaWxkLnN0eWxlLndpZHRoID0gZXhwYW5kLm9mZnNldFdpZHRoICsgMSArICdweCc7XG4gICAgZXhwYW5kQ2hpbGQuc3R5bGUuaGVpZ2h0ID0gZXhwYW5kLm9mZnNldEhlaWdodCArIDEgKyAncHgnO1xuICAgIGV4cGFuZC5zY3JvbGxMZWZ0ID0gZXhwYW5kLnNjcm9sbFdpZHRoO1xuICAgIGV4cGFuZC5zY3JvbGxUb3AgPSBleHBhbmQuc2Nyb2xsSGVpZ2h0O1xuICB9O1xuXG4gIHZhciBjaGVja1RyaWdnZXJzID0gZnVuY3Rpb24gY2hlY2tUcmlnZ2VycyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0V2lkdGggIT0gZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy53aWR0aCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCAhPSBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLmhlaWdodDtcbiAgfTtcblxuICB2YXIgc2Nyb2xsTGlzdGVuZXIgPSBmdW5jdGlvbiBzY3JvbGxMaXN0ZW5lcihlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuICAgIHJlc2V0VHJpZ2dlcnModGhpcyk7XG4gICAgaWYgKHRoaXMuX19yZXNpemVSQUZfXykgY2FuY2VsRnJhbWUodGhpcy5fX3Jlc2l6ZVJBRl9fKTtcbiAgICB0aGlzLl9fcmVzaXplUkFGX18gPSByZXF1ZXN0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNoZWNrVHJpZ2dlcnMoZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18uaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgIGZuLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qIERldGVjdCBDU1MgQW5pbWF0aW9ucyBzdXBwb3J0IHRvIGRldGVjdCBlbGVtZW50IGRpc3BsYXkvcmUtYXR0YWNoICovXG4gIHZhciBhbmltYXRpb24gPSBmYWxzZSxcbiAgICAgIGFuaW1hdGlvbnN0cmluZyA9ICdhbmltYXRpb24nLFxuICAgICAga2V5ZnJhbWVwcmVmaXggPSAnJyxcbiAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgPSAnYW5pbWF0aW9uc3RhcnQnLFxuICAgICAgZG9tUHJlZml4ZXMgPSAnV2Via2l0IE1veiBPIG1zJy5zcGxpdCgnICcpLFxuICAgICAgc3RhcnRFdmVudHMgPSAnd2Via2l0QW5pbWF0aW9uU3RhcnQgYW5pbWF0aW9uc3RhcnQgb0FuaW1hdGlvblN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQnLnNwbGl0KCcgJyksXG4gICAgICBwZnggPSAnJztcbiAge1xuICAgIHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpO1xuICAgIGlmIChlbG0uc3R5bGUuYW5pbWF0aW9uTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhbmltYXRpb24gPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbVByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlbG0uc3R5bGVbZG9tUHJlZml4ZXNbaV0gKyAnQW5pbWF0aW9uTmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwZnggPSBkb21QcmVmaXhlc1tpXTtcbiAgICAgICAgICBhbmltYXRpb25zdHJpbmcgPSBwZnggKyAnQW5pbWF0aW9uJztcbiAgICAgICAgICBrZXlmcmFtZXByZWZpeCA9ICctJyArIHBmeC50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgICAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgPSBzdGFydEV2ZW50c1tpXTtcbiAgICAgICAgICBhbmltYXRpb24gPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGFuaW1hdGlvbk5hbWUgPSAncmVzaXplYW5pbSc7XG4gIHZhciBhbmltYXRpb25LZXlmcmFtZXMgPSAnQCcgKyBrZXlmcmFtZXByZWZpeCArICdrZXlmcmFtZXMgJyArIGFuaW1hdGlvbk5hbWUgKyAnIHsgZnJvbSB7IG9wYWNpdHk6IDA7IH0gdG8geyBvcGFjaXR5OiAwOyB9IH0gJztcbiAgdmFyIGFuaW1hdGlvblN0eWxlID0ga2V5ZnJhbWVwcmVmaXggKyAnYW5pbWF0aW9uOiAxbXMgJyArIGFuaW1hdGlvbk5hbWUgKyAnOyAnO1xufVxuXG52YXIgY3JlYXRlU3R5bGVzID0gZnVuY3Rpb24gY3JlYXRlU3R5bGVzKCkge1xuICBpZiAoIXN0eWxlc0NyZWF0ZWQpIHtcbiAgICAvL29wYWNpdHk6MCB3b3JrcyBhcm91bmQgYSBjaHJvbWUgYnVnIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yODYzNjBcbiAgICB2YXIgY3NzID0gKGFuaW1hdGlvbktleWZyYW1lcyA/IGFuaW1hdGlvbktleWZyYW1lcyA6ICcnKSArICcucmVzaXplLXRyaWdnZXJzIHsgJyArIChhbmltYXRpb25TdHlsZSA/IGFuaW1hdGlvblN0eWxlIDogJycpICsgJ3Zpc2liaWxpdHk6IGhpZGRlbjsgb3BhY2l0eTogMDsgfSAnICsgJy5yZXNpemUtdHJpZ2dlcnMsIC5yZXNpemUtdHJpZ2dlcnMgPiBkaXYsIC5jb250cmFjdC10cmlnZ2VyOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCIgXFxcIjsgZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyB9IC5yZXNpemUtdHJpZ2dlcnMgPiBkaXYgeyBiYWNrZ3JvdW5kOiAjZWVlOyBvdmVyZmxvdzogYXV0bzsgfSAuY29udHJhY3QtdHJpZ2dlcjpiZWZvcmUgeyB3aWR0aDogMjAwJTsgaGVpZ2h0OiAyMDAlOyB9JyxcbiAgICAgICAgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgc3R5bGVzQ3JlYXRlZCA9IHRydWU7XG4gIH1cbn07XG5cbnZhciBhZGRSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZFJlc2l6ZUxpc3RlbmVyKGVsZW1lbnQsIGZuKSB7XG4gIGlmIChhdHRhY2hFdmVudCkgZWxlbWVudC5hdHRhY2hFdmVudCgnb25yZXNpemUnLCBmbik7ZWxzZSB7XG4gICAgaWYgKCFlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXykge1xuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT0gJ3N0YXRpYycpIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY3JlYXRlU3R5bGVzKCk7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fID0ge307XG4gICAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18gPSBbXTtcbiAgICAgIChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5jbGFzc05hbWUgPSAncmVzaXplLXRyaWdnZXJzJztcbiAgICAgIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZXhwYW5kLXRyaWdnZXJcIj48ZGl2PjwvZGl2PjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cImNvbnRyYWN0LXRyaWdnZXJcIj48L2Rpdj4nO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyk7XG4gICAgICByZXNldFRyaWdnZXJzKGVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxMaXN0ZW5lciwgdHJ1ZSk7XG5cbiAgICAgIC8qIExpc3RlbiBmb3IgYSBjc3MgYW5pbWF0aW9uIHRvIGRldGVjdCBlbGVtZW50IGRpc3BsYXkvcmUtYXR0YWNoICovXG4gICAgICBhbmltYXRpb25zdGFydGV2ZW50ICYmIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fLmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uc3RhcnRldmVudCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUuYW5pbWF0aW9uTmFtZSA9PSBhbmltYXRpb25OYW1lKSByZXNldFRyaWdnZXJzKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5wdXNoKGZuKTtcbiAgfVxufTtcblxudmFyIHJlbW92ZVJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlUmVzaXplTGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcbiAgaWYgKGF0dGFjaEV2ZW50KSBlbGVtZW50LmRldGFjaEV2ZW50KCdvbnJlc2l6ZScsIGZuKTtlbHNlIHtcbiAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uc3BsaWNlKGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5pbmRleE9mKGZuKSwgMSk7XG4gICAgaWYgKCFlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18ubGVuZ3RoKSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbExpc3RlbmVyLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fID0gIWVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZFJlc2l6ZUxpc3RlbmVyOiBhZGRSZXNpemVMaXN0ZW5lcixcbiAgcmVtb3ZlUmVzaXplTGlzdGVuZXI6IHJlbW92ZVJlc2l6ZUxpc3RlbmVyXG59OyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufTtcbiIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICByYXdIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4iXX0=
