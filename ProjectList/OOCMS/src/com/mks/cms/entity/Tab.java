
package com.mks.cms.entity;

import java.io.Serializable;

/**
 * Tab entity.
 * @author thachle
 */
public class Tab implements Serializable {
    /**  Tab identifer. */
    private String id;
    
    /**  Name of the tab. */
    private String name;
    
    /**  Hyperlink of the tab. */
    private String link;

    /** Tooltip or title of the tab. */
    private String tooltip;

    /**
     * Get value of id.
     * @return the id
     */
    public String getId() {
        return id;
    }
    /**
     * Set the value for id.
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }
    /**
     * Get value of name.
     * @return the name
     */
    public String getName() {
        return name;
    }
    /**
     * Set the value for name.
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
    /**
     * Get value of link.
     * @return the link
     */
    public String getLink() {
        return link;
    }
    /**
     * Set the value for link.
     * @param link the link to set
     */
    public void setLink(String link) {
        this.link = link;
    }
    /**
     * Get value of tooltip.
     * @return the tooltip
     */
    public String getTooltip() {
        return tooltip;
    }
    /**
     * Set the value for tooltip.
     * @param tooltip the tooltip to set
     */
    public void setTooltip(String tooltip) {
        this.tooltip = tooltip;
    }
}
