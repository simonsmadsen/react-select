/* eslint react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import Creatable from './components/Creatable';
import Contributors from './components/Contributors';
import GithubUsers from './components/GithubUsers';
import CustomComponents from './components/CustomComponents';
import CustomRender from './components/CustomRender';
import Multiselect from './components/Multiselect';
import NumericSelect from './components/NumericSelect';
import BooleanSelect from './components/BooleanSelect';
import Virtualized from './components/Virtualized';
import States from './components/States';

ReactDOM.render(
	<div>
		<Creatable
			hint="Enter a value that's NOT in the list, then hit return"
			label="Custom tag creation"
		/>
	</div>,
	document.getElementById('example')
);
