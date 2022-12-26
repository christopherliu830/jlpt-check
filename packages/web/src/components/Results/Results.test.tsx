import { QuizHistory } from 'components/Quiz/util';

export const mockData: QuizHistory = [
  {
    exercise: {
      id: 2992,
      choices: ['飯みました', '飲みました', '餃みました', '炊みました'],
      correct: [1],
      directiveId: 172,
      difficulty: 1,
      prompt: 'コーヒーを <u>のみました</u>。',
      directive: {
        id: 172,
        prompt: 'Select the correct reading from the underlined word.',
        type: 'SELECT_OR_FILL',
      },
    },
    answers: ['飲みました'],
  },
  {
    exercise: {
      id: 3100,
      choices: ['アイディア', 'ルール', 'あんない', 'せつめい'],
      correct: [1],
      directiveId: 174,
      difficulty: 2,
      prompt: 'わたし は テストの<blank-space></blank-space>を よく しりません。',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['ルール'],
  },
  {
    exercise: {
      id: 3013,
      choices: ['安内', '家内', '室内', '案内'],
      correct: [3],
      directiveId: 173,
      difficulty: 3,
      prompt:
        '<ruby>山<rt>やま</rt>口<rt>ぐち</rt></ruby>さんに<ruby>東<rt>とう</rt>京<rt>きょう</rt></ruby>を<u>あんない</u>してもらった。',
      directive: {
        id: 173,
        prompt: 'Select the correct best kanji representation of the underlined word.',
        type: 'SELECT_OR_FILL',
      },
    },
    answers: ['案内'],
  },
  {
    exercise: {
      id: 3157,
      choices: [
        'ジョギングは健康の<u><ruby>利<rt>り</rt>益<rt>えき</rt></ruby></u>になる。',
        'この値段で売ったら、店の<u><ruby>利<rt>り</rt>益<rt>えき</rt></ruby></u>ははとんどない。',
        'かぜ薬を飲んだが、<u><ruby>利<rt>り</rt>益<rt>えき</rt></ruby></u>が感じられない。',
        'バスの<u><ruby>利<rt>り</rt>益<rt>えき</rt></ruby></u>は、新幹緻よりも料金が安いことだ。',
      ],
      correct: [1],
      directiveId: 176,
      difficulty: 4,
      prompt: '<ruby>利<rt>えき</rt>益<rt>り</rt></ruby>',
      directive: {
        id: 176,
        prompt: 'Given the following word, select the best usage from the following options.',
        type: 'SELECT',
      },
    },
    answers: ['ジョギングは健康の<u><ruby>利<rt>り</rt>益<rt>えき</rt></ruby></u>になる。'],
  },
  {
    exercise: {
      id: 3066,
      choices: ['いつのまにか', 'いつ', 'いつでも', 'いつか'],
      correct: [3],
      directiveId: 174,
      difficulty: 3,
      prompt:
        'Ａ「<ruby>沖<rt>おき</rt>縄<rt>なわ</rt></ruby>旅行はどうだった？」\nＢ「海が青くて、料理もおいしくて、最高だったよ。」\nＡ「いいなあ。わたしも<blank-space></blank-space>一度いってみたいなあ。」',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['いつでも'],
  },
  {
    exercise: {
      id: 3099,
      choices: ['きぶん', 'きょうみ', 'こころ', 'しゅみ'],
      correct: [1],
      directiveId: 174,
      difficulty: 2,
      prompt: 'わたしは にほんの まんがに<blank-space></blank-space>が あります。',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['きょうみ'],
  },
  {
    exercise: {
      id: 3069,
      choices: ['来られても', 'いらっしゃっても', 'うかがっても', 'いかれても'],
      correct: [2],
      directiveId: 174,
      difficulty: 3,
      prompt:
        '学生「先生、ご<ruby>相<rt>そう</rt>談<rt>だん</rt></ruby>したいことがあるのですが、<ruby>授<rt>じゅ</rt>業<rt>ぎょう</rt></ruby>の後、先生の研究室に<blank-space></blank-space>よろしいでしょうか。」\n先生「はい、いいですよ。」',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['うかがっても'],
  },
  {
    exercise: {
      id: 3008,
      choices: ['険しい', '激しい', '暴しい', '極しい'],
      correct: [1],
      directiveId: 173,
      difficulty: 4,
      prompt: '退院しても、しばらくの間、<u>はげしい</u>運動はしないでください。',
      directive: {
        id: 173,
        prompt: 'Select the correct best kanji representation of the underlined word.',
        type: 'SELECT_OR_FILL',
      },
    },
    answers: ['激しい'],
  },
  {
    exercise: {
      id: 3029,
      choices: ['お出しになる以上', 'お出しになるうえ', 'お出しする以上', 'お出しするうえ'],
      correct: [2],
      directiveId: 174,
      difficulty: 5,
      prompt:
        '（インタビューで）\nＡ「お店で一番気をつけていることは何ですか」。\nＢ「衛生管理です。お客様に食事を<blＡnk-space></blank-space>衛生面の管理には、何よりも注意しております。」',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['お出しになるうえ'],
  },
  {
    exercise: {
      id: 3049,
      choices: ['いないわけじゃないよ', 'いるわけないじゃない', 'いたわけじゃないよ', 'いなかったわけじゃな'],
      correct: [1],
      directiveId: 174,
      difficulty: 4,
      prompt:
        '（会社で）\nＡ「あれ？あそこにいるの、山さんかな。」\nＢ「山田きさんは出張中だよ。今ここに<blank-space></blank-space>。」',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['いないわけじゃないよ'],
  },
  {
    exercise: {
      id: 3178,
      choices: ['何をやっていた', '<ruby>練<rt>れん</rt>習<rt>しゅう</rt></ruby>', 'によって', 'が'],
      correct: [2, 3, 1, 0],
      directiveId: 177,
      difficulty: 3,
      prompt:
        'Ａ「週末、試合<blank-space></blank-space><blank-space></blank-space><blank-space></blank-space><blank-space></blank-space>んですか。」\nＢ「すみません。」',
      directive: {
        id: 177,
        prompt: 'Order the following choices in the best order to fill in the <blank-space></blank-space>s.',
        type: 'ORDERED_SELECT',
      },
    },
    answers: ['によって', 'が', '<ruby>練<rt>れん</rt>習<rt>しゅう</rt></ruby>', '何をやっていた'],
  },
  {
    exercise: {
      id: 3175,
      choices: ['それだけで', 'どんな思いで', '買ってくれたのかと', '思うと'],
      correct: [1, 2, 3, 0],
      directiveId: 177,
      difficulty: 4,
      prompt:
        '忘れられないプレゼントは、小学生のときに両親が買ってくれた自転車です。苦しい生活の中、<blank-space></blank-space><blank-space></blank-space><blank-space></blank-space><blank-space></blank-space>涙が出ます。',
      directive: {
        id: 177,
        prompt: 'Order the following choices in the best order to fill in the <blank-space></blank-space>s.',
        type: 'ORDERED_SELECT',
      },
    },
    answers: ['どんな思いで', '思うと', '買ってくれたのかと', 'それだけで'],
  },
  {
    exercise: {
      id: 3136,
      choices: ['多くなった', '少なくなった', 'きれいになった', 'きたなくなった'],
      correct: [1],
      directiveId: 175,
      difficulty: 3,
      prompt: '最近、この川は水が<u>へった</u>気がする。',
      directive: {
        id: 175,
        prompt: 'Select the choice closest in meaning to the underlined word.',
        type: 'SELECT',
      },
    },
    answers: ['少なくなった'],
  },
  {
    exercise: {
      id: 3156,
      choices: [
        'その店のセーターは<u>せめて</u>１万円はするだろう。',
        '今からタクシーに乗っても、<u>せめて</u>１０時には着けない。',
        '京都に行くなら、<u>せめて</u>１泊はしたい。',
        '先週のテストは自信がなかったが、<u>せめて</u>５０点は取れた。',
      ],
      correct: [2],
      directiveId: 176,
      difficulty: 4,
      prompt: 'せめて',
      directive: {
        id: 176,
        prompt: 'Given the following word, select the best usage from the following options.',
        type: 'SELECT',
      },
    },
    answers: ['京都に行くなら、<u>せめて</u>１泊はしたい。'],
  },
  {
    exercise: {
      id: 3026,
      choices: ['は', 'と', 'や', 'か'],
      correct: [1],
      directiveId: 174,
      difficulty: 5,
      prompt: 'この鍋は、いため物に、揚げ物に<blank-space></blank-space>何にでも使えて便利です。',
      directive: {
        id: 174,
        prompt: 'Select the option that best fits in the <blank-space></blank-space>.',
        type: 'SELECT',
      },
    },
    answers: ['は'],
  },
];
