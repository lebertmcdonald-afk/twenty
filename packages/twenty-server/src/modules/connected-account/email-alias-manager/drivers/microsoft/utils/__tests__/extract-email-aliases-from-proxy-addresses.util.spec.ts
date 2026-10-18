import { extractEmailAliasesFromProxyAddresses } from 'src/modules/connected-account/email-alias-manager/drivers/microsoft/utils/extract-email-aliases-from-proxy-addresses.util';

describe('extractEmailAliasesFromProxyAddresses', () => {
  it('should return secondary smtp addresses without the prefix', () => {
    const result = extractEmailAliasesFromProxyAddresses([
      'SMTP:john@contoso.com',
      'smtp:john.doe@contoso.com',
      'smtp:sales@contoso.com',
    ]);

    expect(result).toEqual(['john.doe@contoso.com', 'sales@contoso.com']);
  });

  it('should exclude the primary SMTP address', () => {
    const result = extractEmailAliasesFromProxyAddresses([
      'SMTP:john@contoso.com',
    ]);

    expect(result).toEqual([]);
  });

  it('should exclude non-smtp proxy address types', () => {
    const result = extractEmailAliasesFromProxyAddresses([
      'SMTP:john@contoso.com',
      'smtp:john.doe@contoso.com',
      'SIP:john@contoso.com',
      'sip:john.legacy@contoso.com',
      'SPO:SPO_a1b2c3@SPO_d4e5f6',
      'X500:/o=ExchangeLabs/ou=Exchange Administrative Group/cn=Recipients/cn=john',
      'x500:/o=First Organization/ou=Exchange/cn=Recipients/cn=john',
      'EUM:1234;phone-context=contoso.com',
    ]);

    expect(result).toEqual(['john.doe@contoso.com']);
  });

  it('should lowercase and trim aliases', () => {
    const result = extractEmailAliasesFromProxyAddresses([
      'smtp: John.Doe@Contoso.com ',
    ]);

    expect(result).toEqual(['john.doe@contoso.com']);
  });

  it('should drop empty addresses', () => {
    const result = extractEmailAliasesFromProxyAddresses(['smtp:', 'smtp:  ']);

    expect(result).toEqual([]);
  });

  it('should return an empty array when proxy addresses are missing', () => {
    expect(extractEmailAliasesFromProxyAddresses(undefined)).toEqual([]);
    expect(extractEmailAliasesFromProxyAddresses(null)).toEqual([]);
    expect(extractEmailAliasesFromProxyAddresses([])).toEqual([]);
  });
});
