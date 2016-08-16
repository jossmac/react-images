import { PropTypes, Component, Children } from 'react';
import theme from '../theme';
import { deepMerge } from '../utils';

class ThemeProvider extends Component {
	getChildContext () {
		const extended = deepMerge(theme, this.props.theme);
		console.log('ThemeProvider extended', extended);

		return {
			theme: extended,
		};
	}
	getChildContext () {
		return {
			theme: this.props.site.theme,
		};
	}
	render () {
		return Children.only(this.props.children);
	}
}

ThemeProvider.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

module.exports = ThemeProvider;
