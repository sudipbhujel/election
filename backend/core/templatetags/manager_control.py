from django import template
from django.utils.safestring import mark_safe

from ethereum.manager import Manager
from ethereum.functions import state, manager

register = template.Library()


@register.inclusion_tag('admin/manager_control.html', takes_context=True)
def manager_control(context):
    # Instantiate Manager class
    managee = Manager()

    request = context['request']
    st = state()
    man = manager()

    ctx = {'state': st, 'manager': man}

    if "_start-election" in request.POST:
        receipt = managee.start_vote()
        tx_hash = receipt['transactionHash'].hex()
        url = f'https://rinkeby.etherscan.io/tx/{tx_hash}'
        st = state()
        if receipt['status']:

            ctx['message'] = mark_safe(
                f'<p style="color:green;"> \
                ✔ You successfully started the election. \
                Please, visit <a href={url}>{url}</a> for \
                further information.</p>')
            return ctx
        else:
            ctx['message'] = mark_safe(
                f'<p style="color:red;"> X Oops! we got some error. \
                Please, navigate to <a href={url}>{url}</a> for further \
                information.</p>')
            return ctx

    if "_end-election" in request.POST:
        receipt = managee.end_vote()
        tx_hash = receipt['transactionHash'].hex()
        url = f'https://rinkeby.etherscan.io/tx/{tx_hash}'
        st = state()
        if receipt['status']:

            ctx['message'] = mark_safe(
                f'<p style="color:green;"> \
                ✔ You successfully ended the election. \
                Please, visit <a href={url}>{url}</a> for \
                further information.</p>')
            return ctx
        else:
            return {'message': mark_safe(
                f'<p style="color:red;"> X Oops! we got some error. \
                Please, navigate to <a href={url}>{url}</a> for \
                further information.</p>')}
    return ctx
