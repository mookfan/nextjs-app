import Image from 'next/image';
import Link from 'next/link';

export interface projectPreViewInterface {
    title: string;
    desc: string;
    linkUrl: string;
    image: string;
}

const ProjectPreView = (props: projectPreViewInterface) => {

    return (
    <div className='flex gap-4 rounded-full bg-gradient-to-r from-slate-300 to-gray-50 '>
        <div className="relative w-24 h-24">
            <Image src={props.image} layout="fill" className="rounded-full"/>
        </div>
        <div className="my-auto">
            <Link  href={props.linkUrl}>
                <a className="font-bold underline hover:text-indigo-600">{props.title}</a>
            </Link>
            <div>{props.desc}</div>
        </div>
    </div>
    );
};

export default ProjectPreView;
