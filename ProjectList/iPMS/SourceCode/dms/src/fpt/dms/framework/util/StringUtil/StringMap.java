/*
 * Copyright (c) 2009, FPT Software JSC
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *	- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *	- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *	- Neither the name of the FPT Software JSC nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
 /*******************************************************************************
 * File:        StringMap.java
 * Author:      Nguyen Thai Son - FPT Software
 * Revisions:   2002.01.07 - Nguyen Thai Son - First written
 * Copyright:   Copyright (c) FPT Software. All rights reserved.
/******************************************************************************/

package fpt.dms.framework.util.StringUtil;

public class StringMap
{
  private int m_nDim = 0;
  private StringMatrix m_smxMap = null;

  public StringMap(int dim)
  {
    this.m_nDim = dim;
    m_smxMap = new StringMatrix(dim,2);
  }
  public StringMap(String strMap)
  {
    m_smxMap = new StringMatrix(strMap);
    m_nDim = m_smxMap.getNumberOfRows();
  }
  public int getDim()
  {
    return m_nDim;
  }

  public boolean setVector(int i,String key, StringVector strVector)
  {
    if (m_smxMap.setCell(i,0,key))
    {
      return m_smxMap.setCell(i,1,strVector.toString());
    }
    return false;
  }
  public StringVector getVector (String key)
  {
    for (int i=0; i<m_nDim;i++)
    {
      if (key.equals(m_smxMap.getCell(i,0)))
      {
        return this.getVector(i);
      }
    }
    return null;
  }
  public StringVector getVector (int i)
  {
    String temp = m_smxMap.getCell(i,1);
    StringVector strVector = new StringVector(temp);
    return strVector;
  }
  public String toString()
  {
    return m_smxMap.toString();
  }
}