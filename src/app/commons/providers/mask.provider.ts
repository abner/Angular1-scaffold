uiMaskProviderConfig.$inject = ['uiMaskConfigProvider'];

export function uiMaskProviderConfig(
    uiMaskConfigProvider: any
) {
    uiMaskConfigProvider.maskDefinitions({
        'A': /[a-zAZ]/,
        '*': /[0-9a-zA-zçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/
    });
    uiMaskConfigProvider.clearOnBlur(false);
    uiMaskConfigProvider.eventsToHandle(['input', 'keyup', 'click']);
}
