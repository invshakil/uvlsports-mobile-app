// added so later we can keep breakpoint in sync automatically using this config file

const getters = {
    windowBreakPoint: state => {
        if (state.windowWidth >= 1200) return "xl";
        else if (state.windowWidth >= 992) return "lg";
        else if (state.windowWidth >= 768) return "md";
        else if (state.windowWidth >= 576) return "sm";
        else return "xs"
    }
};

export default getters