/**
 * @desc 排他筛选
 */

export default function usePaita() {


    const paita = (list, idx, key) => {
        let selectedLen = list.filter(item => item[key]).length
        let child = list[idx]
        // 没有选过,则直接选中
        if (selectedLen <= 0) {
            child[key] = true
        } else if (selectedLen > 0 && child[key]) {
            // 如果已经选过且是自己,则直接取消
            child[key] = false
        } else {
            // 如果是其他情况,则先把其他的全部取消,再给自己选中
            list.map(item => item[key] = false)
            child[key] = true
        }
        return {
            list
        }
    }

    return {
        paita
    }
}
