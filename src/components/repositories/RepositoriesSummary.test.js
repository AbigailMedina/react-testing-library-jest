import {screen, render } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays information about the repository',()=>{
	const repository={
		language:'Javascript',
		'stargazers_count': 5,
		'forks': 30,
		open_issues:1
	}

	render(<RepositoriesSummary repository={repository}/>)

	for( let key in repository){
		const val = repository[key];
		const element= screen.getByText(new RegExp(val));
		expect(element).toBeInTheDocument();
	}
	// const language = screen.getByText('Javascript');
	// const stars = screen.getByText(5);
	// const forks = screen.getByText(30);
	// const openIssues = screen.getByText(1);

	// expect(language).toBeInTheDocument();
	// expect(stars).toBeInTheDocument();
	// expect(forks).toBeInTheDocument();
	// expect(openIssues).toBeInTheDocument();

});