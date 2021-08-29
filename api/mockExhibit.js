module.exports = (req, res) => {
    // This looks disgusting, but I wanted to mock bio text of a realistic length.
    const exhibit = {
        id: '4eb3b685-d451-4553-80a0-eff904bc33e6',
        name: 'Aretha Franklin',
        description:
            'Aretha Louise Franklin (March 25, 1942 – August 16, 2018) was an American singer, songwriter, and\n' +
            'pianist. Referred to as the "Queen of Soul", she has twice been placed 9th in Rolling Stone\'s 100\n' +
            'Greatest Artists of All Time. Franklin began her career as a child, singing gospel at New Bethel Ba\n' +
            'ptist Church in Detroit, Michigan, where her father C. L. Franklin was a minister. At the age of 18\n' +
            ', she embarked on a secular-music career as a recording artist for Columbia Records. While her caree\n' +
            'r did not immediately flourish, she found acclaim and commercial success once she signed with Atlant\n' +
            'ic Records in 1966. Her commercial hits such as "I Never Loved a Man (The Way I Love You)", "Respect\n' +
            '", "(You Make Me Feel Like) A Natural Woman", "Chain of Fools", "Think" and "I Say a Little Prayer" \n' +
            'propelled her past her musical peers. Franklin continued to record acclaimed albums such as I Never \n' +
            'Loved a Man the Way I Love You (1967), Lady Soul (1968), Spirit in the Dark (1970), Young, Gifted an\n' +
            'd Black (1972), Amazing Grace (1972), and Sparkle (1976), before experiencing problems with her reco\n' +
            'rd company. She left Atlantic in 1979 and signed with Arista Records. She appeared in the 1980 film \n' +
            '985), and Aretha (1986) on the Arista label. In 1998, Franklin returned to the Top 40 with the L\n' +
            'auryn Hill-produced song "A Rose Is Still a Rose"; later, she released an album of the same name\n' +
            ', which was certified gold. Franklin recorded 112 charted singles on Billboard, including 77 Hot\n' +
            '100 entries, 17 top-ten pop singles, 100 R&B entries, and 20 number-one R&B singles. Besides th\n' +
            'e foregoing, Franklin\'s well-known hits also include "Ain\'t No Way", "Call Me", "Don\'t Play \n' +
            'That Song (You Lied)", "Spanish Harlem", "Rock Steady", "Day Dreaming", "Until You Come Back to\n' +
            'Me (That\'s What I\'m Gonna Do)", "Something He Can Feel", "Jump to It", "Freeway of Love", "W\n' +
            'ho\'s Zoomin\' Who", and "I Knew You Were Waiting (For Me)" (a duet with George Michael). She \n' +
            'won 18 Grammy Awards, including the first eight awards given for Best Female R&B Vocal Perform\n' +
            'ance (1968–1975) and a Grammy Awards Living Legend honor and Lifetime Achievement Award. Frank\n' +
            'lin is one of the best-selling music artists of all time, having sold more than 75 million rec\n' +
            'ords worldwide. Franklin received numerous honors throughout her career. She was awarded the N\n' +
            'ational Medal of Arts and the Presidential Medal of Freedom. In 1987, she became the first fem\n' +
            'ale performer to be inducted into the Rock and Roll Hall of Fame. She also was inducted into t\n' +
            'he UK Music Hall of Fame in 2005 and into the Gospel Music Hall of Fame in 2012. In 2010, Roll\n' +
            'ing Stone magazine ranked her number one on its list of the "100 Greatest Singers of All Time"\n' +
            'and number nine on its list of "100 Greatest Artists of All Time". The Pulitzer Prize jury in\n' +
            '2019 awarded Franklin a posthumous special citation "for her indelible contribution to Ameri\n' +
            'can music and culture for more than five decades". In 2020, she was inducted into the Nation\n' +
            'al Womens Hall of Fame.'
    };
    res.status(200).send(exhibit);
};
