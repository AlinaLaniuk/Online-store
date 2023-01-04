const promoCodesInfo: promoCodesInfoI = {
    promoCodes: {'qwerty': 5,
    '11111': 10,
    'hello world': 7,
    '12345': 4,
    'password': 12,
    },
    promoCodesKeys: ['qwerty', '11111', 'hello world', '12345', 'password'],
}

interface promoCodesInfoI {
    promoCodes: promoCodesI;
    promoCodesKeys: ['qwerty'?, '11111'?, 'hello world'?, '12345'?, 'password'?];
}
interface promoCodesI{
    [x: string]: number
}
export default promoCodesInfo;