import { redirect } from 'next/navigation';

export default function EnglishHomePage() {
    // Redirect to the static English HTML file
    redirect('/en/index.html');
}
