import { isNonEmptyString } from '@sniptt/guards';

const SECONDARY_SMTP_PROXY_ADDRESS_PREFIX = 'smtp:';

// proxyAddresses entries look like "TYPE:address". "SMTP:" (uppercase) is the
// primary address, "smtp:" (lowercase) a secondary one. Other types such as
// SIP:, SPO: or X500: are not email addresses and must not become aliases.
export const extractEmailAliasesFromProxyAddresses = (
  proxyAddresses: string[] | null | undefined,
): string[] =>
  (proxyAddresses ?? [])
    .filter((proxyAddress) =>
      proxyAddress.startsWith(SECONDARY_SMTP_PROXY_ADDRESS_PREFIX),
    )
    .map((proxyAddress) =>
      proxyAddress
        .slice(SECONDARY_SMTP_PROXY_ADDRESS_PREFIX.length)
        .trim()
        .toLowerCase(),
    )
    .filter(isNonEmptyString);
