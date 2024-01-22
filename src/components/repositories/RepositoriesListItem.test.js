import {render, screen, act} from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import {MemoryRouter} from 'react-router-dom';

// jest.mock('../tree/FileIcon',()=>{
// 	//mock contents of FileIcon.js
// 	return ()=>{
// 		return 'File Icon Component';
// 	};
// })

function renderComponent(){
	const repo={
		full_name:'facebook/react',
		language:'Javascript',
		owner: {login:'facebook'},
		description:'a js library',
		name:'react',
		html_url:'https://github.com/facebook/react'
	}

	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repo}/>
		</MemoryRouter>);

	return {repo};
}

test('test that we have a link to the repo',async()=>{
	
	const { repo } = renderComponent();
	// worst solution to resolve act errors
	// await act(async()=>{
	// 	await pause();
	// });

	// best solution for act error resolutions
	await screen.findByRole('img', {name:repo.language});
	const link = screen.getByRole('link', {name:/github repository/i});
	expect(link).toHaveAttribute('href',repo.html_url);

});

test('shows a file icon with the appropriate icon',async()=>{
	const { repo } = renderComponent();
	const icon = await screen.findByRole('img', {name:repo.language});
	
	expect(icon).toHaveClass('js-icon');
})

test('shows a link to the code editor page',async()=>{
	const {repo} = renderComponent();
	await screen.findByRole('img',{name:repo.language})
	const link = await screen.findByRole('link',{
		name:new RegExp(repo.owner.login)
	})
	expect(link).toHaveAttribute('href',`/repositories/${repo.full_name}`)
})
	
	
const pause = () =>{
	return new Promise (resolve =>{
		setTimeout(()=>{
			resolve();
		},100);
	})
}