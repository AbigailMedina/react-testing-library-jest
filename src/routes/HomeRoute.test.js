import {render, screen } from '@testing-library/react';
import {setupServer} from 'msw/node';
import { rest } from 'msw';
import {MemoryRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import {createServer} from '../test/server';

// const handlers = [
// 	rest.get('/api/repositories', (req,res, ctx)=>{
// 		const query = req.url.searchParams.get('q');
// 		// console.log(query);
// 		const language = req.url.searchParams.get('q').split('language:')[1];

// 		return res(ctx.json({
// 			items:[
// 				{full_name:`${language}_one`, id:1},
// 			 	{full_name:`${language}_two`, id:2}]
// 		}))
// 	})
// ];

// const server = setupServer(...handlers);

// beforeAll(()=>{
// 	server.listen();
// });

// afterEach(()=>{
// 	server.resetHandlers();
// });

// afterAll(()=>{
// 	server.close();
// });
 createServer([
	 {
	 	path:'/api/repositories',
	 	method:'get',
	 	res:(req,res,ctx)=>{
	 		const language = req.url.searchParams.get('q').split('language:')[1];

	 		return {
			
			items:[
				{full_name:`${language}_one`, id:1},
			 	{full_name:`${language}_two`, id:2}
				]
			}
	 	}
	 }
 ]);

test('renders 2 links for each language table',async()=>{
	render(
		<MemoryRouter>
			<HomeRoute/>
		</MemoryRouter>
	);
	// await pause();
	// screen.debug();
	const languages = ['javascript', 'typescript','rust','go','python','java'];
	//for each language, we are finding the links
	for (let lang of languages){

		const links = await screen.findAllByRole('link',
			{name:new RegExp(`${lang}_`)
		})
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveTextContent(`${lang}_one`);
		expect(links[1]).toHaveTextContent(`${lang}_two`);
		expect(links[0]).toHaveAttribute('href',`/repositories/${lang}_one`);
		expect(links[1]).toHaveAttribute('href',`/repositories/${lang}_two`);
	}

	
	
})

test('there is a table for every language',async()=>{
	render(
		<MemoryRouter>
			<HomeRoute/>
		</MemoryRouter>
	);
	const tables = await screen.findAllByRole('heading',{name:/most popular/i});
	expect(tables).toHaveLength(6);
})

	
const pause = () =>{
	return new Promise (resolve =>{
		setTimeout(()=>{
			resolve();
		},100);
	})
}