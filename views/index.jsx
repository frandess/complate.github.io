import DefaultLayout from "./layout";
import Container from "./components/container";
import TitleBlock from "./components/title_block";
import Renderer, { createElement, safe } from "complate-stream";
import Breadcrumb, { BreadcrumbLink, CurrentPage } from "./components/breadcrumb";

let { registerView, renderView } = new Renderer();

registerView(render);

export default renderView;

function linkify (slug) {
	return `/${slug}.html`;
}

function PageBreadcrumb ({ slug, pageTitle }) {
	if (slug === "index") {
		return null;
	}
	return <Breadcrumb>
		<BreadcrumbLink href={linkify("index")}>Home</BreadcrumbLink>
		<CurrentPage href={linkify(slug)}>{pageTitle}</CurrentPage>
	</Breadcrumb>;
}

function ContainerWhenSubpage({ slug }, ...children) {
	if (slug === "index") {
		return children
	}
	return <Container>
		{children}
	</Container>
}

function render({ slug, meta, html }) {
	if (meta.h1) {
		return <DefaultLayout title={meta.title} desc={meta.desc}>
			<TitleBlock startPage={slug === "index"}>
				<h1>{meta.h1}</h1>
				<p>{meta.subtitle}</p>
				<p>{meta.description}</p>
			</TitleBlock>
			<PageBreadcrumb slug={slug} pageTitle={meta.h1} />
			<ContainerWhenSubpage slug={slug}>
				{safe(html)}
			</ContainerWhenSubpage>
		</DefaultLayout>;
	}

	return <DefaultLayout title={meta.title}>
		<Container>
			{safe(html)}
		</Container>
	</DefaultLayout>;
}
