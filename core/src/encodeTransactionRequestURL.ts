import { SOLANA_PROTOCOL } from './constants';
import { Label, Message } from './types';

/**
 * Fields of a Solana Pay transaction request URL.
 */
export interface TransactionRequestURLFields {
    /** `link` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#link). */
    link: URL;
    /** `label` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#label). */
    label?: Label;
    /** `message` in the [Solana Pay spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#message).  */
    message?: Message;
}

/**
 * Encode a Solana Pay transaction request URL.
 *
 * @param fields Fields to encode in the URL.
 */
export function encodeTransactionRequestURL({ link, label, message }: TransactionRequestURLFields): string {
    let url = SOLANA_PROTOCOL + link.search ? encodeURIComponent(String(link)) : String(link);

    const params = new URLSearchParams();

    if (label) {
        params.append('label', label);
    }

    if (message) {
        params.append('message', message);
    }

    const search = params.toString();
    if (search) {
        url += '?' + search;
    }

    return url;
}